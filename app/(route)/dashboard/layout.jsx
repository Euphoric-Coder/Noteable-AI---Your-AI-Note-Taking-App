"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div>
      <div
        className={`fixed hidden xl:block ${sidebarCollapsed ? "w-24" : "xl:w-ml-64"} h-screen transition-transform duration-1000`}
      >
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      <div
        className={`${sidebarCollapsed ? "ml-24" : "xl:ml-64"} transition-transform duration-1000`}
      >
        {/* <Header /> */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
