"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FolderOpen,
  Upload,
  FileText,
  Plus,
  X,
  Loader2,
  Calendar,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export default function CreateWorkspaceDialog({ children }) {
  const { user } = useUser();

  // Convex hooks
  const generateUploadUrl = useMutation(api.uploadFile.generateUploadUrl);
  const addPDF = useMutation(api.uploadFile.addFile);
  const getURL = useMutation(api.storeFile.getFileURL);
  const embedDocument = useAction(api.myActions.ingest);
  const deleteFile = useMutation(api.files.deleteFile);
  const createWorkspace = useMutation(api.files.createWorkspace);
  const fetchUserFiles = useQuery(api.files.fetchUserFiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress,
  });

  // State
  const [open, setOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [showSummary, setShowSummary] = useState(false);
  const [uploadedFileIds, setUploadedFileIds] = useState([]);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelection({ target: { files: e.dataTransfer.files } });
  };

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    const newDrafts = files.map((file) => ({
      id: uuidv4(),
      file,
      name: file.name,
      editableName: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      status: "pending",
    }));
    setDrafts((prev) => [...prev, ...newDrafts]);
  };

  const renameDraft = (id, newName) =>
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, editableName: newName } : d))
    );

  const removeDraft = async (id) => {
    const d = drafts.find((f) => f.id === id);
    if (d?.fileId) await deleteFile({ fileId: d.fileId });
    setDrafts((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadDrafts = async () => {
    for (const d of drafts) {
      if (d.status !== "pending") continue;
      setDrafts((prev) =>
        prev.map((f) => (f.id === d.id ? { ...f, status: "uploading" } : f))
      );

      try {
        const postUrl = await generateUploadUrl();
        const uploadRes = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": d.file.type },
          body: d.file,
        });
        const { storageId } = await uploadRes.json();
        const fileURL = await getURL({ storageId });
        const fileId = uuidv4();

        await addPDF({
          fileId,
          storageId,
          fileName: d.editableName,
          fileURL,
          createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        });

        const apiRes = await axios.get("/api/load-pdf", {
          params: { pdfURL: fileURL },
        });
        await embedDocument({ docOutput: apiRes.data.result, fileId });

        setDrafts((prev) =>
          prev.map((f) =>
            f.id === d.id
              ? { ...f, status: "done", fileId, fileURL, name: d.editableName }
              : f
          )
        );

        setUploadedFileIds((prev) => [...prev, fileId]);
      } catch (err) {
        console.error(err);
        toast.error("Upload failed.");
        setDrafts((prev) =>
          prev.map((f) => (f.id === d.id ? { ...f, status: "error" } : f))
        );
      }
    }
  };

  const totalSelected = uploadedFileIds.length + selectedIds.size;

  const handleContinue = () => {
    if (!workspaceName.trim() || totalSelected === 0) {
      toast.error("Please fill required fields.");
      return;
    }
    setShowSummary(true);
  };

  const confirmCreate = async () => {
    try {
      const fileIds = [...uploadedFileIds, ...Array.from(selectedIds)];
      const res = await createWorkspace({
        name: workspaceName,
        description,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        fileIds,
      });
      console.log("Workspace created:", res);
      toast.success("Workspace created successfully!");
      resetDialog();
    } catch (e) {
      console.error(e);
      toast.error("Failed to create workspace.");
    }
  };

  const cancelWithAlert = () => setConfirmCancelOpen(true);

  const confirmCancel = async () => {
    for (const d of drafts) {
      if (d.fileId) await deleteFile({ fileId: d.fileId });
    }
    resetDialog();
    setConfirmCancelOpen(false);
    toast("Workspace creation cancelled. Uploaded files deleted.");
  };

  const resetDialog = () => {
    setWorkspaceName("");
    setDescription("");
    setDrafts([]);
    setSelectedIds(new Set());
    setUploadedFileIds([]);
    setShowSummary(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        {/* ─────────────── STEP 1: MAIN CREATION ─────────────── */}
        {!showSummary && (
          <DialogContent
            onInteractOutside={(e) => e.preventDefault()}
            className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                  <FolderOpen className="h-5 w-5 text-red-600" />
                </div>
                Create Workspace
              </DialogTitle>
              <DialogDescription>
                Upload or select files and define workspace details.
              </DialogDescription>
            </DialogHeader>

            {/* Workspace Info */}
            <div className="space-y-4 mt-2">
              <div>
                <Label>Workspace Name *</Label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Enter workspace name..."
                  className="focus:ring-red-400 focus:border-red-400"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the workspace..."
                  className="focus:ring-red-400 focus:border-red-400 min-h-[80px]"
                />
              </div>
            </div>

            {/* File Section */}
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Upload Files</Label>
                <Badge variant="secondary" className="text-xs">
                  {totalSelected} files selected
                </Badge>
              </div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="upload">Upload New</TabsTrigger>
                  <TabsTrigger value="existing">From Dashboard</TabsTrigger>
                </TabsList>

                {/* Upload New */}
                <TabsContent value="upload">
                  <Card
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`border-2 border-dashed transition ${
                      isDragging
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <Upload className="h-8 w-8 text-red-500 mx-auto mb-3" />
                      <p className="text-gray-600 mb-3">
                        Drag & drop or click to select PDF files
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileSelection}
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload").click()
                        }
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Draft Files */}
                  {drafts.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <Label>Selected Files</Label>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-red-100 text-red-700"
                        >
                          {drafts.length} file{drafts.length > 1 && "s"}
                        </Badge>
                      </div>

                      {drafts.map((d) => (
                        <div
                          key={d.id}
                          className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <FileText className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              {d.status === "pending" ? (
                                <Input
                                  value={d.editableName}
                                  onChange={(e) =>
                                    renameDraft(d.id, e.target.value)
                                  }
                                  className="text-sm"
                                />
                              ) : (
                                <p className="font-medium text-gray-900">
                                  {d.editableName}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">{d.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {d.status === "uploading" && (
                              <div className="flex items-center gap-1">
                                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                                <span className="text-xs text-red-500 font-medium">
                                  Uploading...
                                </span>
                              </div>
                            )}
                            {d.status === "done" && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Embedded ✓
                              </Badge>
                            )}
                            {d.status === "error" && (
                              <Badge className="bg-red-100 text-red-700 text-xs">
                                Error
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeDraft(d.id)}
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        className="mt-3 bg-red-500 hover:bg-red-600 text-white"
                        onClick={uploadDrafts}
                      >
                        Upload & Embed
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Existing Files */}
                <TabsContent value="existing">
                  <div className="mt-3 space-y-2 border rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <Label>Available Files</Label>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-red-100 text-red-700"
                      >
                        {fetchUserFiles ? fetchUserFiles.length : 0} file
                        {fetchUserFiles?.length > 1 && "s"}
                      </Badge>
                    </div>

                    {(fetchUserFiles || []).map((f) => {
                      const checked = selectedIds.has(f.fileId);
                      return (
                        <div
                          key={f.fileId}
                          onClick={() => {
                            setSelectedIds((prev) => {
                              const next = new Set(prev);
                              if (next.has(f.fileId)) next.delete(f.fileId);
                              else next.add(f.fileId);
                              return next;
                            });
                          }}
                          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                            checked
                              ? "bg-red-50 border-red-300"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <Checkbox
                            checked={checked}
                            className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                          />
                          <div className="p-2 bg-red-100 rounded-lg">
                            <FileText className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{f.fileName}</p>
                            <p className="text-xs text-gray-500">
                              {f.storageSizeMB || "0.00"} MB •{" "}
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {new Date(f._creationTime).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={cancelWithAlert}>
                Cancel
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!workspaceName.trim() || totalSelected === 0}
                className="bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600"
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {/* ─────────────── STEP 2: SUMMARY ─────────────── */}
        {showSummary && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Confirm Workspace</DialogTitle>
              <DialogDescription>
                Review all details before final creation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-3">
              <p>
                <strong>Name:</strong> {workspaceName}
              </p>
              <p>
                <strong>Description:</strong> {description || "—"}
              </p>
              <p>
                <strong>Total Files:</strong> {totalSelected}
              </p>

              {/* Uploaded PDFs */}
              {drafts.some((d) => d.status === "done") && (
                <div className="space-y-2">
                  <strong>Uploaded PDF Files:</strong>
                  {drafts
                    .filter((d) => d.status === "done")
                    .map((d) => (
                      <div
                        key={d.fileId}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <a
                          href={d.fileURL}
                          target="_blank"
                          className="text-red-600 hover:underline flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          {d.name}
                          <ExternalLink className="h-3 w-3 ml-1 text-red-500" />
                        </a>
                        <span className="text-xs text-gray-500">{d.size}</span>
                      </div>
                    ))}
                </div>
              )}

              {/* Disclaimer moved here */}
              <p className="text-xs text-gray-500 italic mt-2 border-t pt-2">
                ⚠️ Uploaded files not part of any confirmed workspace will be
                deleted if you cancel this creation process.
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSummary(false)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button variant="outline" onClick={cancelWithAlert}>
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600"
                onClick={confirmCreate}
              >
                Confirm & Create
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* ─────────────── ALERT DIALOG ─────────────── */}
      <AlertDialog open={confirmCancelOpen} onOpenChange={setConfirmCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel? <br />
              All uploaded files (not yet part of any workspace) will be deleted
              permanently from storage and embeddings will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Editing</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={confirmCancel}
            >
              Discard Workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
