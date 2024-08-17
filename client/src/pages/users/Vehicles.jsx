import React from "react";
import Menu from "../../components/common/user/Menu";
import Sidebar from "../../components/common/user/Sidebar";
import ClientTable from "../../components/layout/ClientTable";

export default function Vehicles() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
      {/* Header */}
      <Menu />
      {/* ./Header */}
      <Sidebar />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <ClientTable />
      </div>
    </div>
  );
}
