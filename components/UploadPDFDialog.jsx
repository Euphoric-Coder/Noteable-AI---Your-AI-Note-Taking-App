"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const UploadPDFDialog = () => {
  const generateUploadUrl = useMutation(api.uploadURL.generateUploadUrl);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const resetState = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      toast.success(`File "${file.name}" ready for upload!`);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      toast.success(`File "${selectedFile.name}" ready for upload!`);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const onUpload = async () => {
    if (!file) {
      toast.error("No file selected for upload.");
      return;
    }

    setLoading(true);
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
      const { storageId } = await result.json();
      console.log(storageId)

      if (result.ok) {
        toast.success("File uploaded successfully!");
        resetState();
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      toast.error("An error occurred during the upload.");
    } finally {
      setLoading(false);
    }
    console.log(file);
  };

  return (
    <Dialog
      onOpenChange={() => {
        setLoading(false);
        setFile(null);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full">+ Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription>Select a file to upload.</DialogDescription>
        </DialogHeader>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative flex flex-col items-center justify-center p-8 border-2 rounded-xl cursor-pointer transition-all ${
            isDragging
              ? "border-blue-600 bg-gradient-to-br from-cyan-100 to-indigo-200"
              : "border-blue-300 bg-gradient-to-br from-cyan-50 to-indigo-100"
          } shadow-md hover:shadow-lg`}
        >
          <FiUploadCloud className="text-blue-600 text-6xl mb-4" />
          <div className="text-center">
            <p className="text-blue-800 text-lg font-semibold">
              Drag & Drop your PDF file here
            </p>
            <p className="text-md text-indigo-500 mt-1">
              or click to browse files
            </p>
          </div>
          <Label
            htmlFor="pdf-upload"
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
        </div>
        {file && (
          <div className="mt-4 text-gray-700">
            <strong>Selected File:</strong> {file.name}
          </div>
        )}
        <Button onClick={onUpload} className="mt-6 w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPDFDialog;
