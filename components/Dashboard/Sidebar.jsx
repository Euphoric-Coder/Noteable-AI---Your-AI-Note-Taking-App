"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LayoutDashboard, FolderOpen, Crown, Settings } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-extrabold text-3xl hover:animate-glow">
            NoteAble
          </span>
        </Link>
      </div>
      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive("/dashboard")
                ? "bg-red-50 text-red-600 border border-red-200"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            href="/dashboard/workspace"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === "/dashboard/workspace" ||
              pathname.startsWith("/workspace/")
                ? "bg-red-50 text-red-600 border border-red-200"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FolderOpen className="h-5 w-5" />
            <span className="font-medium">Workspace</span>
          </Link>

          <Link
            href={"/dashboard/upgrade"}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === "/dashboard/upgrade" ||
              pathname.startsWith("/upgrade/")
                ? "bg-red-50 text-red-600 border border-red-200"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Crown className="h-5 w-5" />
            <span className="font-medium">Upgrade</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-6 border-t border-gray-200 space-y-4">
        {/* Progress Section */}
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

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
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
        </div>
      </div>
    </div>
  );
}
