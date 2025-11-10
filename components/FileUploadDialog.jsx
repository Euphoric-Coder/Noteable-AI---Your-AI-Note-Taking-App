import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  X,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "sonner";

export default function FileUploadDialog({ children, onFilesUploaded }) {
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.uploadFile.generateUploadUrl);
  const addPDF = useMutation(api.uploadFile.addFile);
  const getURL = useMutation(api.storeFile.getFileURL);
  const embedDocument = useAction(api.myActions.ingest);
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStage, setUploadStage] = useState("select"); // Simulated existing files count

  const handleFileSelection = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newPendingFiles = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      originalName: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      file: file,
    }));

    setPendingFiles((prev) => [...prev, ...newPendingFiles]);
    setUploadStage("confirm");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    handleFileSelection({ target: { files } });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleStartUpload = async () => {
    if (pendingFiles.length === 0) return;

    setIsUploading(true);
    setUploadStage("uploading");

    const newFiles = pendingFiles.map((file) => ({
      id: file.id,
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
    }));
    setUploadedFiles(newFiles);

    for (const file of pendingFiles) {
      const fileId = uuidv4();

      try {
        // Step 1: allocate Convex upload URL
        const postUrl = await generateUploadUrl();

        // Step 2: upload file blob
        const upload = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.file.type },
          body: file.file,
        });
        const { storageId } = await upload.json();

        // Step 3: get public URL from Convex
        const fileURL = await getURL({ storageId });

        // Step 4: save metadata in Convex
        await addPDF({
          fileId,
          storageId,
          fileName: file.name,
          fileURL,
          createdBy: user?.primaryEmailAddress.emailAddress,
        });

        // Step 5: extract + embed the PDF
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "processing", progress: 100 } : f
          )
        );

        const apiResponse = await axios.get("/api/load-pdf", {
          params: { pdfURL: fileURL },
        });
        await embedDocument({ docOutput: apiResponse.data.result, fileId });

        // Step 6: mark as processed
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "processed", progress: 100 } : f
          )
        );
      } catch (err) {
        console.error(err);
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, status: "error" } : f))
        );
      }
    }

    setIsUploading(false);
    toast.success("All files uploaded successfully!");
    if (onFilesUploaded) onFilesUploaded(pendingFiles);
  };

  const removePendingFile = (fileId) => {
    setPendingFiles((prev) => {
      const updated = prev.filter((file) => file.id !== fileId);
      if (updated.length === 0 && uploadStage === "confirm") {
        setUploadStage("select");
      }
      return updated;
    });
  };

  const updatePendingFileName = (fileId, newName) => {
    setPendingFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, name: newName } : file
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500" />
        );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "uploading":
        return "bg-blue-100 text-blue-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resetDialog = () => {
    setPendingFiles([]);
    setUploadedFiles([]);
    setIsUploading(false);
    setUploadStage("select");
  };

  const handleClose = () => {
    if (!isUploading) {
      setOpen(false);
      resetDialog();
    }
  };

  const canProceed =
    pendingFiles.length > 0 &&
    pendingFiles.every((file) => file.name.trim().length > 0);

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isUploading) {
          setOpen(newOpen);
          if (!newOpen) resetDialog();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
              <Upload className="h-5 w-5 text-red-600" />
            </div>
            <span>
              {uploadStage === "select" && "Select PDF Files"}
              {uploadStage === "confirm" && "Confirm Upload"}
              {uploadStage === "uploading" && "Uploading Files"}
            </span>
          </DialogTitle>

          {/* Step Indicators */}
          <div className="flex items-center justify-center space-x-4 py-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  uploadStage === "select"
                    ? "bg-red-500 text-white"
                    : "bg-red-100 text-red-600"
                }`}
              >
                1
              </div>
              <span
                className={`text-sm font-medium ${
                  uploadStage === "select" ? "text-red-600" : "text-gray-500"
                }`}
              >
                Select
              </span>
            </div>

            <div
              className={`w-8 h-0.5 ${
                uploadStage !== "select" ? "bg-red-200" : "bg-gray-200"
              }`}
            />

            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  uploadStage === "confirm"
                    ? "bg-red-500 text-white"
                    : uploadStage === "uploading"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm font-medium ${
                  uploadStage === "confirm"
                    ? "text-red-600"
                    : uploadStage === "uploading"
                      ? "text-gray-600"
                      : "text-gray-400"
                }`}
              >
                Review
              </span>
            </div>

            <div
              className={`w-8 h-0.5 ${
                uploadStage === "uploading" ? "bg-red-200" : "bg-gray-200"
              }`}
            />

            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  uploadStage === "uploading"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                3
              </div>
              <span
                className={`text-sm font-medium ${
                  uploadStage === "uploading" ? "text-red-600" : "text-gray-400"
                }`}
              >
                Upload
              </span>
            </div>
          </div>

          <DialogDescription>
            {uploadStage === "select" &&
              "Choose PDF documents to upload and analyze with AI-powered search."}
            {uploadStage === "confirm" &&
              "Review and rename your files before uploading."}
            {uploadStage === "uploading" &&
              "Your files are being uploaded and processed."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {uploadStage === "select" && (
            <div className="space-y-6">
              {pendingFiles.length > 0 && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-green-900">
                            {pendingFiles.length} files ready for review
                          </p>
                          <p className="text-sm text-green-700">
                            {pendingFiles.length <= 3
                              ? pendingFiles.map((f) => f.name).join(", ")
                              : `${pendingFiles
                                  .slice(0, 3)
                                  .map((f) => f.name)
                                  .join(
                                    ", "
                                  )} and ${pendingFiles.length - 3} more`}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadStage("confirm")}
                        className="border-green-200 text-green-600 hover:bg-green-50"
                      >
                        Review Files
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed transition-colors ${
                  isDragging
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-red-300"
                }`}
              >
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="p-4 bg-gradient-to-r from-red-100 to-red-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Upload className="h-10 w-10 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {pendingFiles.length > 0
                        ? "Add More PDF Files"
                        : "Upload PDF Files"}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {pendingFiles.length > 0
                        ? "Select additional PDF files to add to your upload queue"
                        : "Drag and drop your PDF files here, or click to browse"}
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileSelection}
                      className="hidden"
                      id="file-upload"
                    />
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {pendingFiles.length > 0
                          ? "Add More Files"
                          : "Choose Files"}
                      </Button>
                      {pendingFiles.length > 0 && (
                        <Button
                          onClick={() => setUploadStage("confirm")}
                          className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
                        >
                          Review {pendingFiles.length} Files
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {uploadStage === "confirm" && (
            <div className="space-y-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pendingFiles.map((file) => (
                  <Card key={file.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                          <FileText className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Input
                            value={file.name}
                            onChange={(e) =>
                              updatePendingFileName(file.id, e.target.value)
                            }
                            className="font-medium"
                            placeholder="Enter file name"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {file.size}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePendingFile(file.id)}
                          className="text-gray-400 hover:text-red-600 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {uploadStage === "uploading" && (
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <FileText className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(file.status)}>
                            {file.status}
                          </Badge>
                          {getStatusIcon(file.status)}
                        </div>
                      </div>
                      {file.status !== "processed" &&
                        file.status !== "error" && (
                          <Progress value={file.progress} className="h-2" />
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {uploadStage === "select" && pendingFiles.length === 0 && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}

          {uploadStage === "select" && pendingFiles.length > 0 && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setUploadStage("confirm")}
                className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
              >
                Review Files
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          )}

          {uploadStage === "confirm" && (
            <>
              <Button
                variant="outline"
                onClick={() => setUploadStage("select")}
                disabled={isUploading}
              >
                Back
              </Button>
              <Button
                onClick={handleStartUpload}
                disabled={!canProceed || isUploading}
                className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload {pendingFiles.length} Files
              </Button>
            </>
          )}

          {uploadStage === "uploading" && (
            <Button
              onClick={handleClose}
              disabled={isUploading}
              className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
            >
              {isUploading ? "Uploading..." : "Done"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
