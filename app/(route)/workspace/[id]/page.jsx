"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchQuery = useAction(api.myActions.search);
  const fetchFileData = useMutation(api.myQueries.fetchUserFiles);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [fileData, setFileData] = useState([]);
  const fileId = useParams();

  useEffect(() => {
    fetchFileData({ fileId: fileId.id }).then((data) => {
      setFileData(data[0]);
    });
  }, [fileData]);

  const searchAi = async () => {
    setResult(
      JSON.parse(await searchQuery({ query: query, fileId: fileId.id }))
    );
  };
  return (
    <div>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button onClick={() => searchAi()}>Search</Button>
      <div className="mt-4 text-4xl font-extrabold">
        Result from Query: {query ? `"${query}"` : "No Query"}
      </div>
      <div>
        {result.length > 0 ? (
          <div>{result[0].pageContent}</div>
        ) : (
          <div>No Results</div>
        )}
      </div>
      <div>
        {fileData.fileName}
        <br />
        <Link href={`${fileData.fileURL}`} target="_blank">{fileData.fileURL}</Link>
      </div>
    </div>
  );
};

export default page;
