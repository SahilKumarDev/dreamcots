"use client";

import { useProfile } from "@/hooks/useProfile";

import React from "react";

const AdminPage = () => {
  const { user } = useProfile();

  return (
    <div className="w-screen h-screen flex-center">
      <h1 className="text-5xl">Welcome {user?.name} to the Admin Panel</h1>
    </div>
  );
};

export default AdminPage;
