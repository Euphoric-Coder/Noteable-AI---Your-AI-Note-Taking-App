import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Upload from "./Upload";

const UploadPDFDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">+ upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        {/* <Upload /> */}
      </DialogContent>
    </Dialog>
  );
};

export default UploadPDFDialog;
