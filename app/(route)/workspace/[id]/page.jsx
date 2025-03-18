"use client";

import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { fileId } = useParams();
  return <div>page</div>;
};

export default page;
