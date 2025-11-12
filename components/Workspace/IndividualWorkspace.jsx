"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/Workspace/PDFViewer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ArrowLeft,
  Save,
  Edit3,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { format } from "date-fns";
import Editor from "./Editor";
import { toast } from "sonner";

export default function WorkspaceDetail() {
  const { id } = useParams(); // workspaceId from URL
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPDFId, setSelectedPDFId] = useState(null);

  // Fetch workspace and related PDF files
  const data = useQuery(api.workspace.fetchWorkspaceById, { workspaceId: id });
  const workspace = data?.workspace;
  const pdfFiles = data?.files || [];

  // Handle loading and error states
  if (data === undefined)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading workspace...
      </div>
    );
  if (!workspace)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Workspace not found.
      </div>
    );

  const selectedPDF =
    pdfFiles.find((pdf) => pdf.fileId === selectedPDFId) || pdfFiles[0];

  const handlePreviousPDF = () => {
    const currentIndex = pdfFiles.findIndex(
      (pdf) => pdf.fileId === selectedPDFId
    );
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : pdfFiles.length - 1;
    setSelectedPDFId(pdfFiles[previousIndex].fileId);
  };

  const handleNextPDF = () => {
    const currentIndex = pdfFiles.findIndex(
      (pdf) => pdf.fileId === selectedPDFId
    );
    const nextIndex = currentIndex < pdfFiles.length - 1 ? currentIndex + 1 : 0;
    setSelectedPDFId(pdfFiles[nextIndex].fileId);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white"
      }`}
    >
      {/* ─────────────── Top Navigation ─────────────── */}
      <div
        className={`border-b ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        } sticky top-0 z-10`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-0">
          {/* Back Button and Workspace Name */}
          <div className="flex items-center justify-between space-x-2 sm:space-x-4 w-full sm:w-auto">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href={"/dashboard/workspace"}
                className={
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }
              >
                <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Workspaces</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 sm:flex-none">
            {isEditing ? (
              <input
                type="text"
                value={workspace.name}
                onChange={() => {}}
                className={`text-lg sm:text-xl font-semibold bg-transparent border-b-2 border-red-400 focus:outline-none w-full sm:w-auto ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditing(false);
                }}
                autoFocus
              />
            ) : (
              <h1
                className={`text-lg sm:text-xl font-semibold cursor-pointer hover:text-red-400 transition-colors truncate ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
                onClick={() => setIsEditing(true)}
              >
                {workspace.name}
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className={
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Sun
                className={`h-4 w-4 ${
                  darkMode ? "text-gray-400" : "text-yellow-500"
                }`}
              />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-red-400"
              />
              <Moon
                className={`h-4 w-4 ${
                  darkMode ? "text-blue-400" : "text-gray-400"
                }`}
              />
            </div>

            {/* Save Button */}
            <Button
              variant="outline"
              size="sm"
              className="border-red-400 text-red-400 hover:bg-red-50"
            >
              <Save className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ─────────────── Main Content ─────────────── */}
      <div className="flex flex-col lg:flex-row h-screen overflow-auto">
        {/* Left Panel – Editor */}
        <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 h-[50vh] lg:h-full overflow-auto">
          <div className="flex-1 overflow-auto">
            <Editor fileId={selectedPDFId || pdfFiles[0]?.fileId} />
          </div>
        </div>

        {/* Right Panel – PDF Viewer */}
        <div
          className={`w-full lg:w-1/2 flex flex-col ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          } h-[50vh] lg:h-full overflow-auto`}
        >
          {/* PDF Header */}
          <div
            className={`border-b ${
              darkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            } px-3 sm:px-4 py-2 flex-shrink-0`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
              {/* LEFT: PDF Viewer + File Count */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-start">
                <Badge variant="outline" className="text-xs">
                  PDF Viewer
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {pdfFiles.length} files
                </Badge>
              </div>

              {/* CENTER: PDF Selector */}
              <div className="flex-1 w-full flex justify-center order-last sm:order-none">
                <Select
                  value={selectedPDFId || pdfFiles[0]?.fileId}
                  onValueChange={setSelectedPDFId}
                >
                  <SelectTrigger className="w-full sm:w-[280px] md:w-[320px]">
                    <div className="flex items-center space-x-2 min-w-0">
                      <FileText className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1 truncate">
                        <SelectValue placeholder="Select a PDF..." />
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {pdfFiles.map((pdf) => (
                      <SelectItem key={pdf.fileId} value={pdf.fileId}>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-red-600" />
                          <div>
                            <p className="font-medium truncate max-w-[200px]">
                              {pdf.fileName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(pdf._creationTime).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* RIGHT: Navigation Buttons */}
              {pdfFiles.length > 1 && (
                <div className="flex items-center justify-end space-x-1 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPDF}
                    className="p-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span
                    className={`text-xs px-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {pdfFiles.findIndex((pdf) => pdf.fileId === selectedPDFId) +
                      1}{" "}
                    of {pdfFiles.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPDF}
                    className="p-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* CURRENT PDF INFO */}
            {selectedPDF && (
              <div
                className={`text-xs mt-2 text-center sm:text-left ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } truncate`}
              >
                <span className="font-medium">{selectedPDF.fileName}</span>
                <span className="mx-2">•</span>
                <span>
                  Uploaded{" "}
                  {format(new Date(selectedPDF._creationTime), "dd/MM/yyyy")}
                </span>
              </div>
            )}
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto p-2 sm:p-4">
            {selectedPDF ? (
              <PDFViewer fileURL={selectedPDF.fileURL} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No PDF selected.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
