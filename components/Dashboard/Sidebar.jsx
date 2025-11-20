"use client";

import React from "react";
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
  PanelRightClose,
  PanelRightOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Image from "next/image";
import { UserButtonMenu } from "../UserButton";

export default function Sidebar({ isCollapsed, onToggle }) {
  const pathname = usePathname();
  const { id } = useParams();

  const isActive = (path) => pathname === path;

  return (
    <div
      className={`${
        isCollapsed ? "w-24" : "w-64"
      } h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* ─── Logo + Toggle ─────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-gray-100 dark:border-gray-700">
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center transition-transform duration-300 ease-in-out ${
            isCollapsed ? "justify-center" : "gap-2"
          }`}
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
            className={`${
              isCollapsed ? "hidden" : "block"
            } text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 font-extrabold text-3xl`}
          >
            NoteAble
          </span>
        </Link>

        {/* Collapse Toggle */}
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="md:flex hidden h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <PanelLeftClose className="h-4 w-4 dark:text-gray-300 text-gray-700" />
          </Button>
        )}
      </div>

      {/* ─── Navigation Links ───────────────────────────────────── */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          <TooltipProvider>
            {/* Dashboard */}
            {!isCollapsed ? (
              <Link
                href="/dashboard"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive("/dashboard")
                    ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
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
                        ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
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
                    ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
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
                        ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FolderOpen className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Workspace</TooltipContent>
              </Tooltip>
            )}

            {/* Upgrade */}
            {!isCollapsed ? (
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 px-3 py-2 h-auto text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Crown className="w-5 h-5" />
                <span className="font-medium">Upgrade</span>
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center px-3 py-2 h-auto text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Crown className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Upgrade</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </nav>
      </div>

      {/* Collapse Toggle */}
      <div className="flex justify-center">
        {isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="md:flex hidden w-20 h-20 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 [&_svg]:size-7"
          >
            <PanelLeftOpen className="text-gray-700 dark:text-gray-300" />
          </Button>
        )}
      </div>

      {/* ─── Bottom Section ─────────────────────────────────────── */}
      <div
        className={`px-4 py-6 border-t border-gray-200 dark:border-gray-700 space-y-4 ${
          isCollapsed ? "px-2" : ""
        }`}
      >
        {/* Progress */}
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                PDFs uploaded
              </span>
              <span className="text-gray-900 dark:text-gray-200 font-medium">
                2/5
              </span>
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
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      2/5
                    </span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">PDFs uploaded: 2/5</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* User Info */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <UserButtonMenu />

          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                  john@example.com
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Free Plan
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Settings className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Go to Settings</TooltipContent>
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
                    <Settings className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    john@example.com
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Free Plan
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
