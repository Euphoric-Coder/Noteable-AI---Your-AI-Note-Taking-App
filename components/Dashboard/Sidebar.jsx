"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  FolderOpen,
  Crown,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar({ isCollapsed, onToggle }) {
  const pathname = usePathname();
  const { id } = useParams();
  console.log(id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-200"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </Button>

      {/* Sidebar Container */}
      <div
        className={`
        ${isCollapsed ? "w-24" : "w-64"} 
        h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative
        fixed lg:relative z-40 lg:z-auto
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="mt-2 flex flex-row items-center justify-center">
          {/* Logo Section */}
          <Link
            href="/"
            className="md:hover:scale-110 transition-transform duration-300 ease-in-out flex items-center gap-4"
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
              className={`${isCollapsed ? "hidden" : "block"} text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-extrabold text-3xl hover:animate-glow`}
            >
              NoteAble
            </span>
          </Link>
          {/* Desktop Toggle Button */}
          <div className="hidden lg:flex justify-end p-2 border-b border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Close Header */}
        <div className="flex lg:hidden justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="h-8 w-8 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            <TooltipProvider>
              {/* Dashboard */}
              {!isCollapsed ? (
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive("/dashboard")
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard"
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                        isActive("/dashboard")
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <LayoutDashboard className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Workspace */}
              {!isCollapsed ? (
                <Link
                  href="/dashboard/workspace"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    pathname === "/dashboard/workspace" ||
                    pathname === `/dashboard/workspace/${id}` ||
                    pathname.startsWith("/workspace/")
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FolderOpen className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">Workspace</span>
                </Link>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/workspace"
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                        pathname === "/dashboard/workspace" ||
                        pathname === `/dashboard/workspace/${id}` ||
                        pathname.startsWith("/workspace/")
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <FolderOpen className="w-5 h-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Workspace</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Upgrade */}
              {!isCollapsed ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 px-3 py-2 h-auto text-gray-700 hover:bg-gray-50"
                >
                  <Crown className="w-5 h-5" />
                  <span className="font-medium">Upgrade</span>
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-center px-3 py-2 h-auto text-gray-700 hover:bg-gray-50"
                    >
                      <Crown className="" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Upgrade</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </nav>
        </div>

        {/* Bottom Section */}
        <div
          className={`px-4 py-6 border-t border-gray-200 space-y-4 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          {/* Progress */}
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">PDFs uploaded</span>
                <span className="text-gray-900 font-medium">2/5</span>
              </div>
              <Progress value={40} className="h-2" />
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-red-400 hover:text-red-500"
              >
                Upgrade for more
              </Button>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-red-600">
                        2/5
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>PDFs uploaded: 2/5</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* User Info */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "space-x-3"
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    john@example.com
                  </p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Go to Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>

          {/* Collapsed User Settings */}
          {isCollapsed && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div>
                    <p className="font-medium">john@example.com</p>
                    <p className="text-xs text-gray-500">Free Plan</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </>
  );
}
