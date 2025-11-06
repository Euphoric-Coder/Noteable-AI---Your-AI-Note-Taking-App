"use client";

import Landing from "@/components/Landing/LandingPage";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";

const page = () => {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    const response = await createUser({
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageURL: user?.imageUrl,
    });
  };

  return (
    <div>
      <Landing />
    </div>
  );
};

export default page;
