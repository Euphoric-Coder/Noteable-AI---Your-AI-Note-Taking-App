"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { aiAssist } from "@/lib/aiAssist";
import { useAction, useMutation } from "convex/react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import PDFViewer from "@/components/Workspace/PDFViewer";
import Editor from "@/components/Workspace/Editor";

const page = () => {
  const searchQuery = useAction(api.myActions.search);
  const fetchFileData = useMutation(api.myQueries.fetchUserFiles);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [fileData, setFileData] = useState([]);
  const fileId = useParams();

  useEffect(() => {
    fetchFileData({ fileId: fileId.id }).then((data) => {
      if (!data || data.length === 0) {
        redirect("/dashboard");
      } else {
        setFileData(data[0]);
      }
    });
  }, [fetchFileData]);

  const searchAi = async () => {
    const queryResult = JSON.parse(
      await searchQuery({ query: query, fileId: fileId.id })
    );

    const response = await aiAssist(query, queryResult[0].pageContent);

    setResult(response);
  };
  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <Editor />
      </div>
      <div className="w-full">
        {fileData?.fileURL ? (
          <PDFViewer fileURL={fileData.fileURL} />
        ) : (
          <div className="flex justify-center items-center">Loading PDF...</div>
        )}
      </div>
    </div>
  );
};

export default page;
