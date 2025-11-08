import { useState } from "react";
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
  CreditCard as Edit3,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ArrowLeft,
  Save,
  Play,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

export default function WorkspaceDetail() {
  const { id } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [fileName, setFileName] = useState("Product Research Document");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPDFId, setSelectedPDFId] = useState("1");
  const [editorContent, setEditorContent] = useState(`# Project Notes

## Overview
This is a sample workspace where you can take notes alongside your PDF documents.

## Key Points
- Upload PDFs to the right panel
- Take notes in this editor
- Use AI to search and analyze content
- Collaborate with team members

## Next Steps
1. Review the uploaded document
2. Extract key insights
3. Share findings with the team
`);

  // Dummy PDF files
  const pdfFiles = [
    {
      id: "1",
      name: "Product Requirements Document.pdf",
      url: "https://enduring-hornet-413.convex.cloud/api/storage/416d7946-30b7-4f65-89c6-343f60bd2fa2",
      size: "2.4 MB",
      uploadDate: "2025-01-12",
    },
    {
      id: "2",
      name: "User Research Analysis.pdf",
      url: "https://enduring-hornet-413.convex.cloud/api/storage/416d7946-30b7-4f65-89c6-343f60bd2fa2",
      size: "1.8 MB",
      uploadDate: "2025-01-10",
    },
    {
      id: "3",
      name: "Technical Specifications.pdf",
      url: "https://enduring-hornet-413.convex.cloud/api/storage/416d7946-30b7-4f65-89c6-343f60bd2fa2",
      size: "3.2 MB",
      uploadDate: "2025-01-08",
    },
  ];

  const selectedPDF =
    pdfFiles.find((pdf) => pdf.id === selectedPDFId) || pdfFiles[0];

  const handlePreviousPDF = () => {
    const currentIndex = pdfFiles.findIndex((pdf) => pdf.id === selectedPDFId);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : pdfFiles.length - 1;
    setSelectedPDFId(pdfFiles[previousIndex].id);
  };

  const handleNextPDF = () => {
    const currentIndex = pdfFiles.findIndex((pdf) => pdf.id === selectedPDFId);
    const nextIndex = currentIndex < pdfFiles.length - 1 ? currentIndex + 1 : 0;
    setSelectedPDFId(pdfFiles[nextIndex].id);
  };

  const workspaceName = fileName;

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-white"}`}
    >
      {/* Top Navigation */}
      <div
        className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} sticky top-0 z-10`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
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

            <div className="flex items-center space-x-1 sm:space-x-2 flex-1 sm:flex-none">
              {isEditing ? (
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className={`text-lg sm:text-xl font-semibold bg-transparent border-b-2 border-red-400 focus:outline-none w-full sm:w-auto ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditing(false);
                    }
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
                  {workspaceName}
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
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Sun
                className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-yellow-500"}`}
              />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-red-400"
              />
              <Moon
                className={`h-4 w-4 ${darkMode ? "text-blue-400" : "text-gray-400"}`}
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

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] sm:h-[calc(100vh-81px)]">
        {/* Left Panel - Editor */}
        <div
          className={`flex-1 flex flex-col lg:border-r lg:border-b-0 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} h-1/2 lg:h-full`}
        >
          <div
            className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"} px-3 sm:px-4 py-2`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center space-x-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  Markdown Editor
                </Badge>
                <span
                  className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {editorContent.length} characters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-2 sm:p-4">
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className={`w-full h-full resize-none focus:outline-none font-mono text-xs sm:text-sm leading-relaxed ${
                darkMode
                  ? "bg-gray-900 text-gray-100 placeholder-gray-400"
                  : "bg-white text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Start typing your notes here... You can use Markdown formatting."
            />
          </div>
        </div>

        {/* Right Panel - PDF Viewer */}
        <div
          className={`flex-1 flex flex-col ${darkMode ? "bg-gray-800" : "bg-gray-50"} h-1/2 lg:h-full`}
        >
          <div
            className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"} px-3 sm:px-4 py-2`}
          >
            <div className="space-y-3">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    PDF Viewer
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {pdfFiles.length} files
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  Upload PDF
                </Button>
              </div>

              {/* PDF Switcher */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* PDF Selector */}
                <div className="flex-1 min-w-0">
                  <Select
                    value={selectedPDFId}
                    onValueChange={setSelectedPDFId}
                  >
                    <SelectTrigger className="w-full sm:w-[300px]">
                      <div className="flex items-center space-x-2 min-w-0">
                        <FileText className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <SelectValue />
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {pdfFiles.map((pdf) => (
                        <SelectItem key={pdf.id} value={pdf.id}>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-red-600" />
                            <div>
                              <p className="font-medium truncate max-w-[200px]">
                                {pdf.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {pdf.size} •{" "}
                                {new Date(pdf.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPDF}
                    className="p-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span
                    className={`text-xs px-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {pdfFiles.findIndex((pdf) => pdf.id === selectedPDFId) + 1}{" "}
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
              </div>

              {/* Current PDF Info */}
              <div
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                <span className="font-medium">{selectedPDF.name}</span>
                <span className="mx-2">•</span>
                <span>{selectedPDF.size}</span>
                <span className="mx-2">•</span>
                <span>
                  Uploaded{" "}
                  {format(new Date(selectedPDF.uploadDate), "dd/mm/yyyy")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-2 sm:p-4">
            <PDFViewer fileURL={selectedPDF.url} />
          </div>
        </div>
      </div>
    </div>
  );
}
