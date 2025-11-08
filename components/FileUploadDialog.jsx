import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  CreditCard as Edit3,
} from "lucide-react";

export default function FileUploadDialog({ children, onFilesUploaded }) {
  const [open, setOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStage, setUploadStage] = useState("select");

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

    // Simulate upload progress
    for (const file of newFiles) {
      // Upload simulation
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  progress,
                  status: progress === 100 ? "processing" : "uploading",
                }
              : f
          )
        );
      }

      // Processing simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "processed", progress: 100 } : f
        )
      );
    }

    setIsUploading(false);

    // Call callback if provided
    if (onFilesUploaded) {
      onFilesUploaded(newFiles);
    }
  };

  const removePendingFile = (fileId) => {
    setPendingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const removeUploadedFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
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
          {/* File Selection Stage */}
          {uploadStage === "select" && (
            <Card className="border-2 border-dashed border-gray-200 hover:border-red-300 transition-colors">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-red-100 to-red-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Upload className="h-10 w-10 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Select PDF Files
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Choose your PDF files to upload. You'll be able to review
                    and rename them before uploading.
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileSelection}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("pdf-upload")?.click()
                    }
                    className="border-red-200 text-red-600 hover:bg-red-50 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Choose PDF Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* File Confirmation Stage */}
          {uploadStage === "confirm" && pendingFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Review Files</Label>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {pendingFiles.length} files selected
                </Badge>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {pendingFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <Input
                          value={file.name}
                          onChange={(e) =>
                            updatePendingFileName(file.id, e.target.value)
                          }
                          className="font-semibold text-sm focus:ring-red-400 focus:border-red-400"
                          placeholder="Enter file name..."
                        />
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-500">
                            {file.size}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Ready to upload
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePendingFile(file.id)}
                      className="text-gray-400 hover:text-red-500 p-1 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadStage("select");
                    document.getElementById("pdf-upload")?.click();
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Files
                </Button>

                <Button
                  onClick={handleStartUpload}
                  disabled={!canProceed}
                  className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload {pendingFiles.length} Files
                </Button>
              </div>
            </div>
          )}

          {/* Upload Progress Stage */}
          {uploadStage === "uploading" && uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Upload Progress</Label>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {uploadedFiles.length} files
                </Badge>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-sm">
                          {file.name}
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {file.size}
                          </span>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(file.status)} text-xs px-2 py-1`}
                          >
                            {file.status}
                          </Badge>
                        </div>
                        {(file.status === "uploading" ||
                          file.status === "processing") && (
                          <div className="mt-2">
                            <Progress value={file.progress} className="h-1.5" />
                            <span className="text-xs text-gray-500 mt-1">
                              {file.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(file.status)}
                      {file.status === "processed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUploadedFile(file.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {uploadStage === "select" && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}

          {uploadStage === "confirm" && (
            <>
              <Button
                variant="outline"
                onClick={() => setUploadStage("select")}
              >
                Back
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </>
          )}

          {uploadStage === "uploading" && (
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              {uploadedFiles.length > 0 &&
              uploadedFiles.every((f) => f.status === "processed")
                ? "Done"
                : "Cancel"}
            </Button>
          )}

          {isUploading && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500" />
              <span>Processing files...</span>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
