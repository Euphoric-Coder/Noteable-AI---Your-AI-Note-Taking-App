import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ThemeButton";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { UserButtonMenu } from "../UserButton";
import Image from "next/image";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const firstName = user?.firstName || user?.username || "User";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/noteable.png"
              alt="NoteAble AI Logo"
              width={40}
              height={40}
              draggable={false}
              className="drop-shadow-xl dark:drop-shadow-neon"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white hover:text-red-400 dark:hover:text-red-300 transition-colors">
              NoteAble AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={"#features"}
              className="text-gray-700 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Features
            </Link>

            <Link
              href={"#pricing"}
              className="text-gray-700 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Pricing
            </Link>

            <Link
              href={"/dashboard"}
              className="text-gray-700 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Dashboard
            </Link>

            <ModeToggle />

            {/* Auth Buttons */}
            {!isSignedIn ? (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-red-400 hover:bg-red-500 text-white dark:bg-red-500 dark:hover:bg-red-600"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Welcome, {firstName} 👋
                </span>

                <UserButtonMenu />

                <SignOutButton>
                  <Button
                    size="sm"
                    className="bg-red-400 hover:bg-red-500 text-white dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ====================== */}
        {/* Mobile Navigation Menu */}
        {/* ====================== */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href={"#features"}
              className="block text-gray-700 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>

            <Link
              href={"#pricing"}
              className="block text-gray-700 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              href={"/dashboard"}
              className="block text-gray-700 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>

            {/* Auth Section for Mobile */}
            <div className="flex flex-col space-y-2 pt-4">
              {!isSignedIn ? (
                <>
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 dark:text-gray-300 justify-start hover:text-red-400 dark:hover:text-red-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/sign-up">
                    <Button
                      size="sm"
                      className="bg-red-400 hover:bg-red-500 text-white dark:bg-red-500 dark:hover:bg-red-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-gray-700 dark:text-gray-300 font-medium px-1">
                    Welcome, {firstName} 👋
                  </span>

                  <SignOutButton>
                    <Button
                      size="sm"
                      className="bg-red-400 hover:bg-red-500 text-white dark:bg-red-600 dark:hover:bg-red-700 justify-start"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Out
                    </Button>
                  </SignOutButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
