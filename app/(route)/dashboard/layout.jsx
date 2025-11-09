"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import { ModeToggle } from "@/components/ThemeButton";
import { Menu, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-white dark:bg-dark-300 overflow-hidden">
      {/* Sidebar */}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden xl:flex flex-col h-full border-r border-gray-200 dark:border-dark-500/50 bg-white dark:bg-dark-300 transition-all duration-500 ease-in-out ${
          sidebarCollapsed ? "w-24" : "w-64"
        }`}
      >
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </aside>

      {/* Mobile Sidebar Overlay (only visible below xl) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 block xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer (hidden completely on xl) */}
      <aside
        className={`xl:hidden fixed inset-y-0 left-0 w-64 border-r border-gray-200 dark:border-dark-500/50 bg-white dark:bg-dark-300 transform transition-transform duration-500 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isCollapsed={false} onToggle={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 h-full overflow-hidden transition-[margin] duration-500 ease-in-out `}
      >
        {/* Mobile Header */}
        <header className="xl:hidden sticky top-0 z-30 bg-white/80 dark:bg-dark-200/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-500/50">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Sidebar Toggle */}
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-dark-600/50 dark:hover:bg-dark-400/70 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>

            {/* Logo */}
            <div className="flex items-center justify-between px-3 py-3">
              <Link
                href="/"
                className={`flex items-center transition-transform duration-300 ease-in-out gap-2`}
              >
                <Image
                  src="/noteable.png"
                  alt="NoteAble AI Logo"
                  width={40}
                  height={40}
                  draggable={false}
                  className="drop-shadow-xl dark:drop-shadow-neon"
                />
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 font-extrabold text-3xl`}
                >
                  NoteAble
                </span>
              </Link>
            </div>

            {/* Theme Toggle */}
            <div className="w-10">
              <ModeToggle />
            </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-200 transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
}
