import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Plus,
  Upload,
  FileText,
  X,
  FolderOpen,
  Calendar,
  HardDrive,
} from "lucide-react";

export default function CreateWorkspaceDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [existingFiles, setExistingFiles] = useState([
    {
      id: "1",
      name: "Product Requirements Document.pdf",
      size: "2.4 MB",
      uploadDate: "2025-01-12",
      selected: false,
    },
    {
      id: "2",
      name: "User Research Analysis.pdf",
      size: "1.8 MB",
      uploadDate: "2025-01-10",
      selected: false,
    },
    {
      id: "3",
      name: "Technical Specifications.pdf",
      size: "3.2 MB",
      uploadDate: "2025-01-08",
      selected: false,
    },
    {
      id: "4",
      name: "Market Analysis Report.pdf",
      size: "1.5 MB",
      uploadDate: "2025-01-05",
      selected: false,
    },
  ]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const toggleExistingFile = (fileId) => {
    setExistingFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );
  };

  const selectedExistingCount = existingFiles.filter(
    (file) => file.selected
  ).length;
  const totalSelectedFiles = uploadedFiles.length + selectedExistingCount;
  const handleCreate = async () => {
    if (!workspaceName.trim()) return;

    setIsCreating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    setWorkspaceName("");
    setDescription("");
    setUploadedFiles([]);
    setIsCreating(false);
    setOpen(false);
  };

  const resetForm = () => {
    setWorkspaceName("");
    setDescription("");
    setUploadedFiles([]);
    setExistingFiles((prev) =>
      prev.map((file) => ({ ...file, selected: false }))
    );
    setActiveTab("upload");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
              <FolderOpen className="h-5 w-5 text-red-600" />
            </div>
            <span>Create New Workspace</span>
          </DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your documents and collaborate
            with others.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Workspace Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspace-name" className="text-sm font-medium">
                Workspace Name *
              </Label>
              <Input
                id="workspace-name"
                placeholder="Enter workspace name..."
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="focus:ring-red-400 focus:border-red-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what this workspace is for..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="focus:ring-red-400 focus:border-red-400 min-h-[80px]"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Upload Files</Label>
              <Badge variant="secondary" className="text-xs">
                {totalSelectedFiles} files selected
              </Badge>
            </div>

            {/* Tabs for Upload vs Existing Files */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="upload"
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload New</span>
                </TabsTrigger>
                <TabsTrigger
                  value="existing"
                  className="flex items-center space-x-2"
                >
                  <HardDrive className="h-4 w-4" />
                  <span>From Dashboard</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                {/* Upload Area */}
                <Card className="border-2 border-dashed border-gray-200 hover:border-red-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload PDF Files
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Drag and drop your PDF files here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Uploaded Files
                    </Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <FileText className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {file.size}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="existing" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Select from Dashboard
                    </Label>
                    <Badge variant="secondary" className="text-xs">
                      {selectedExistingCount} selected
                    </Badge>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-2">
                    {existingFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                          file.selected
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => toggleExistingFile(file.id)}
                      >
                        <Checkbox
                          checked={file.selected}
                          onCheckedChange={() => toggleExistingFile(file.id)}
                          className="data-[state=checked]:bg-red-400 data-[state=checked]:border-red-400"
                        />
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[250px]">
                            {file.name}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{file.size}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(file.uploadDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedExistingCount > 0 && (
                    <div className="text-xs text-gray-600 bg-red-50 p-2 rounded border border-red-200">
                      {selectedExistingCount} file
                      {selectedExistingCount !== 1 ? "s" : ""} selected from
                      your dashboard
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={
              !workspaceName.trim() || isCreating || totalSelectedFiles === 0
            }
            className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create Workspace
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
