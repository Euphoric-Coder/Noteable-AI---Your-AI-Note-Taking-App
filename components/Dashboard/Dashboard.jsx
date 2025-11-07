import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  EllipsisVertical as InfoHorizontal,
  CreditCard as Edit3,
  Trash2,
  FileText,
  Upload,
  Calendar,
  TrendingUp,
  Database,
  Activity,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export default function Dashboard() {
  const [files] = useState([
    {
      id: "1",
      name: "Product Requirements Document.pdf",
      uploadDate: "2025-02-12",
      size: "2.4 MB",
      status: "processed",
    },
    {
      id: "2",
      name: "User Research Analysis.pdf",
      uploadDate: "2025-01-10",
      size: "1.8 MB",
      status: "processed",
    },
  ]);

  const handleEdit = (fileId) => {
    console.log("Edit file:", fileId);
  };

  const handleDelete = (fileId) => {
    console.log("Delete file:", fileId);
  };

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
            <Button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-200/50 transition-all duration-300 transform hover:-translate-y-1">
              <Upload className="h-4 w-4 mr-2" />
              Upload PDF
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Files
                </CardTitle>
                <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+0%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Storage Used
                </CardTitle>
                <div className="p-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                  <Database className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  4.2 MB
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-500 h-1.5 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <span className="text-gray-500">40% of 10 MB</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
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

          {/* Files Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
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
                  <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    No files uploaded yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Upload your first PDF to get started with AI-powered
                    document analysis
                  </p>
                  <Button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-200/50 transition-all duration-300 transform hover:-translate-y-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Your First PDF
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-red-50 hover:to-white transition-all duration-300 border border-gray-100 hover:border-red-200 hover:shadow-md group"
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
                              {format(file.uploadDate, "PPP")}
                            </span>
                            <span className="font-medium">{file.size}</span>
                            <Badge
                              variant="secondary"
                              className={`${getStatusColor(file.status)} px-2 py-1 text-xs font-medium`}
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
                          onClick={() => handleEdit(file.id)}
                          className="border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-300"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 hover:border-gray-300"
                            >
                              <InfoHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(file.id)}
                            >
                              <Edit3 className="h-4 w-4 mr-2" />
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
        </div>
      </div>
    </div>
  );
}
