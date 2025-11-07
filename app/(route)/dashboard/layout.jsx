import Sidebar from "@/components/Dashboard/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="fixed hidden xl:block xl:w-64 h-screen">
        <Sidebar />
      </div>
      <div className="xl:ml-64">
        {/* <Header /> */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
