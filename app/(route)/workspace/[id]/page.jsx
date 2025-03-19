"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const searchQuery = useAction(api.myActions.search);
  const [query, setQuery] = useState("");
  const fileId = useParams();

  const searchAi = async () => {
    console.log(query);
    console.log(fileId.id);
    await searchQuery({ query: query, fileId: fileId.id });
  };
  return (
    <div>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button onClick={() => searchAi()}>Search</Button>
    </div>
  );
};

export default page;
