import { useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <SideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto px-4 py-3">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}