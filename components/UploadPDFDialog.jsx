"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogClose,
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
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { redirect } from "next/navigation";

const UploadPDFDialog = () => {
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.uploadFile.generateUploadUrl);
  const addPDF = useMutation(api.uploadFile.addFile);
  const getURL = useMutation(api.storeFile.getFileURL);
  const embedDocument = useAction(api.myActions.ingest);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [success, setSuccess] = useState(false);
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
    toast.info("Uploading in progress...");
    const fileId = uuidv4();

    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
      const { storageId } = await result.json();
      const fileURL = await getURL({ storageId: storageId });

      // Step 3: Save the newly allocated storage id to the database
      await addPDF({
        fileId: fileId,
        storageId: storageId,
        fileName: fileName,
        fileURL: fileURL,
        createdBy: user?.primaryEmailAddress.emailAddress,
      });

      // Process the PDF file data
      const apiResponse = await axios.get("/api/load-pdf", {
        params: {
          pdfURL: fileURL, // Match backend param name
        },
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
        validateStatus: (status) => status >= 200 && status < 300,
      });

      console.log("Processed PDF Data:", apiResponse.data.result);

      const embeddedResult = await embedDocument({
        docOutput: apiResponse.data.result,
        fileId: fileId,
      });

      console.log("Embedded Document:", embeddedResult);

      if (result.ok) {
        toast.success("File uploaded successfully!");
        resetState();
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      toast.error("An error occurred during the upload.");
      console.log(error);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
      redirect(`/workspace/${fileId}`);
    }
  };

  return (
    <Dialog
      // open={isDialogOpen}
      onOpenChange={() => {
        setLoading(false);
        setFile(null);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
          + Upload PDF
        </Button>
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
          <div className="mt-4 flex flex-col text-gray-700">
            <p>
              <strong>Selected File:</strong> {file.name}
            </p>
            <label htmlFor="file-name" className="mt-4 font-bold ">
              File Name
            </label>
            <Input
              id="file-name"
              type="text"
              placeholder="File Name"
              defaultValue={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="mt-1"
            />
          </div>
        )}
        <Button onClick={onUpload} disabled={loading} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPDFDialog;
