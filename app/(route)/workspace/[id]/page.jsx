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
import Header from "@/components/Header";
import { Badge } from "lucide-react";

const page = () => {
  const searchQuery = useAction(api.myActions.search);
  const fetchFileData = useMutation(api.myQueries.fetchUserFiles);
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
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
    <div>
      <Header />
      <div className="grid grid-cols-2 gap-1">
        <div>
          <Editor />
        </div>
        <div className="w-full">
          {fileData?.fileURL ? (
            <div
              className={`flex-1 flex flex-col ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
            >
              <div
                className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"} px-4 py-2`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    PDF Viewer
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Upload PDF
                  </Button>
                </div>
              </div>

              <div className="flex-1 p-4">
                <PDFViewer fileURL="https://enduring-hornet-413.convex.cloud/api/storage/416d7946-30b7-4f65-89c6-343f60bd2fa2" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              Loading PDF...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
