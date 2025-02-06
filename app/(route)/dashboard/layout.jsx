import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="fixed hidden xl:block xl:w-80 h-screen">
        <Sidebar />
      </div>
      <div className="xl:ml-80">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
