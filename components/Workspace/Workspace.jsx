"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen, FileText, Plus, Clock } from "lucide-react";
import CreateWorkspaceDialog from "@/components/Workspace/CreateWorkspaceDialog";
import { format } from "date-fns";

export default function Workspace() {
  const workspaces = [
    {
      id: "1",
      name: "Product Research",
      description: "Documents related to product research and user analysis",
      fileCount: 5,
      lastModified: "2025-01-12",
      status: "active",
    },
    {
      id: "2",
      name: "Technical Documentation",
      description:
        "API docs, technical specifications, and architecture guides",
      fileCount: 8,
      lastModified: "2025-01-10",
      status: "active",
    },
    {
      id: "3",
      name: "Marketing Materials",
      description: "Brochures, case studies, and marketing documentation",
      fileCount: 3,
      lastModified: "2025-01-08",
      status: "active",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workspaces</h1>
              <p className="text-gray-600 mt-1">
                Organize your documents into workspaces
              </p>
            </div>
            <CreateWorkspaceDialog>
              <Button className="bg-red-400 hover:bg-red-500 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Workspace
              </Button>
            </CreateWorkspaceDialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {workspaces.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No workspaces yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Create your first workspace to organize your documents and
                collaborate with others.
              </p>
              <CreateWorkspaceDialog>
                <Button className="bg-red-400 hover:bg-red-500 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Workspace
                </Button>
              </CreateWorkspaceDialog>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <Link
                  key={workspace.id}
                  href={`/dashboard/workspace/${workspace.id}`}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-md hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg">
                          <FolderOpen className="h-6 w-6 text-red-600" />
                        </div>
                        <Badge
                          variant={
                            workspace.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            workspace.status === "active"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {workspace.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {workspace.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {workspace.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>{workspace.fileCount} files</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {format(new Date(workspace.lastModified), "dd/mm/yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
