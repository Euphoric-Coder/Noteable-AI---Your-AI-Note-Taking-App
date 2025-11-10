"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Upload,
  Calendar,
  TrendingUp,
  Database,
  Activity,
  Plus,
  PenBox,
  ExternalLink,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FileUploadDialog from "@/components/FileUploadDialog";
import RenameFileDialog from "@/components/RenameFileDialog";
import { format } from "date-fns";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user } = useUser();

  // Real-time reactive Convex query
  const fileData = useQuery(api.files.fetchUserFiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress,
  });

  const [files, setFiles] = useState([]);
  const [totalStorageUsed, setTotalStorageUsed] = useState(0);
  const [renameDialog, setRenameDialog] = useState({
    open: false,
    fileId: "",
    fileName: "",
  });

  /** Fetch user files from Convex */
  useEffect(() => {
    if (!fileData) return;

    const formatted = fileData.map((file) => ({
      id: file.fileId,
      name: file.fileName,
      uploadDate: file._creationTime
        ? new Date(file._creationTime).toISOString()
        : new Date().toISOString(),
      size: `${file.storageSizeMB} MB`,
      sizeBytes: parseFloat(file.storageSizeMB),
      status: "processed",
      fileURL: file.fileURL,
    }));

    setFiles(formatted);
    setTotalStorageUsed(formatted.reduce((sum, f) => sum + f.sizeBytes, 0));
  }, [fileData]);

  /** Rename handler */
  const handleEdit = (fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      setRenameDialog({
        open: true,
        fileId,
        fileName: file.name,
      });
    }
  };

  const handleRename = (newName) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === renameDialog.fileId ? { ...file, name: newName } : file
      )
    );
    toast.success(`File renamed to "${newName}"`);
  };

  /** Delete handler */
  const handleDelete = (fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      toast.success(`"${file.name}" deleted successfully.`);
    }
  };

  /** After upload */
  const handleFilesUploaded = () => {
    toast.success("Files uploaded successfully!");
  };

  /** Helper for file status badge */
  const getStatusColor = (status) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalFiles = files.length;
  const storageLimit = 10; // Example 10 MB limit
  const usedPercent = Math.min((totalStorageUsed / storageLimit) * 100, 100);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/20">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage your uploaded files and workspaces
              </p>
            </div>
            <FileUploadDialog onFilesUploaded={handleFilesUploaded}>
              <Button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-200/50 transition-all duration-300 transform hover:-translate-y-1">
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
            </FileUploadDialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Files */}
            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Files
                </CardTitle>
                <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {totalFiles}
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">
                    +{totalFiles > 0 ? 10 : 0}%
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Storage Used */}
            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Storage Used
                </CardTitle>
                <div className="p-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                  <Database className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {totalStorageUsed.toFixed(2)} MB
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-500 h-1.5 rounded-full"
                      style={{ width: `${usedPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-500">
                    {usedPercent.toFixed(0)}% of {storageLimit} MB
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* AI Searches */}
            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  AI Searches
                </CardTitle>
                <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+25%</span>
                  <span className="text-gray-500 ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Uploaded Files List */}
          <Card className="bg-white/80 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-xl font-semibold text-gray-900">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <span>Uploaded Files</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 px-3 py-1"
                >
                  {files.length} files
                </Badge>
              </CardTitle>
              <Separator className="mt-4" />
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No files uploaded yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Upload your first PDF to get started with AI-powered
                    document analysis
                  </p>
                  <FileUploadDialog onFilesUploaded={handleFilesUploaded}>
                    <Button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Your First PDF
                    </Button>
                  </FileUploadDialog>
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-5">
                        <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300">
                          <FileText className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg mb-1">
                            {file.name}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1.5" />
                              {format(
                                new Date(file.uploadDate),
                                "MMM dd, yyyy"
                              )}
                            </span>
                            <span className="font-medium">{file.size}</span>
                            <Badge
                              variant="secondary"
                              className={`${getStatusColor(
                                file.status
                              )} px-2 py-1 text-xs font-medium`}
                            >
                              {file.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(file.fileURL, "_blank", "noopener")
                          }
                          className="border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-300"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(file.id)}
                            >
                              <PenBox className="h-4 w-4 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(file.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <RenameFileDialog
            open={renameDialog.open}
            onOpenChange={(open) =>
              setRenameDialog((prev) => ({ ...prev, open }))
            }
            fileName={renameDialog.fileName}
            onRename={handleRename}
          />
        </div>
      </div>
    </div>
  );
}
