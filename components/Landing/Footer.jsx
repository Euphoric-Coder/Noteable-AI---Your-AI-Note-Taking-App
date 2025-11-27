import { FileText, Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                NoteAble AI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md">
              Store, search, and understand your PDFs with AI. Supercharge your
              document workflows with intelligent semantic search.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Dashboard", href: "/dashboard" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 NoteAble AI. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a className="text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a className="text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-400 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a className="text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
