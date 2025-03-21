"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const fetchFileData = useMutation(api.myQueries.fetchUserFiles);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    user &&
      fetchFileData({ createdBy: user.primaryEmailAddress.emailAddress }).then(
        (data) => {
          setFiles(data);
        }
      );
  }, [user]);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {files.map((file) => (
          <div key={file.fileId} className="bg-gray-200 p-4 rounded-xl hover:bg-gray-600 cursor-pointer">
            <Link href={`/workspace/${file.fileId}`}>{file.fileName}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
