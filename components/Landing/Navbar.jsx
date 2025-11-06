import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NoteAble AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={"#features"}
              className="text-gray-700 hover:text-red-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href={"#pricing"}
              className="text-gray-700 hover:text-red-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href={"/dashboard"}
              className="text-gray-700 hover:text-red-400 transition-colors"
            >
              Dashboard
            </Link>
            <Button variant="ghost" size="sm" className="text-gray-700">
              Login
            </Button>
            <Button
              size="sm"
              className="bg-red-400 hover:bg-red-500 text-white"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href={"#features"}
              className="block text-gray-700 hover:text-red-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href={"#pricing"}
              className="block text-gray-700 hover:text-red-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href={"/dashboard"}
              className="block text-gray-700 hover:text-red-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 justify-start"
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-red-400 hover:bg-red-500 text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
