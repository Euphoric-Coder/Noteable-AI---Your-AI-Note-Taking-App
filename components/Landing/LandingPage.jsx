// ⭐ SAME IMPORTS — NO CHANGE
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import {
  Upload,
  Search,
  FolderOpen,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-red-100/40 to-white dark:from-gray-900 dark:via-gray-800/40 dark:to-gray-900 py-20 lg:py-32">
        {/* Dark transparent overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-red-50/20 dark:from-gray-800/30 dark:to-gray-700/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-transparent dark:via-gray-900/20" />

        <div className="relative max-w-7xl mx-auto mb-20 px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-red-100 text-red-500 bg-white/80 dark:bg-gray-800/80 dark:border-gray-700 dark:text-red-300 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Document Management
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Store, Search, and{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Understand
            </span>{" "}
            Your PDFs with AI
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your document workflow with intelligent semantic search,
            AI-powered insights, and seamless workspace management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-xl hover:shadow-2xl hover:shadow-red-300/60 transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link href={"/dashboard"}>
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-gray-200 hover:border-red-200 bg-white/80 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700/50 backdrop-blur-sm hover:bg-red-50/50 shadow-md hover:shadow-lg hover:shadow-red-100/40 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative mx-auto max-w-4xl">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-red-200/40 dark:shadow-black/40 border border-gray-100 dark:border-gray-700 p-1">
              <div className="bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Manage your uploaded files and workspaces
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                      Upload PDF
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Total Files */}
                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          Total Files
                        </span>
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                          <FileText className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        12
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        +15% this month
                      </div>
                    </div>

                    {/* Storage */}
                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          Storage
                        </span>
                        <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded flex items-center justify-center">
                          <Zap className="h-3 w-3 text-purple-600 dark:text-purple-300" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        24MB
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        60% used
                      </div>
                    </div>

                    {/* Searches */}
                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          Searches
                        </span>
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center">
                          <Search className="h-3 w-3 text-green-600 dark:text-green-300" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        89
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        +32% this week
                      </div>
                    </div>
                  </div>

                  {/* Files Section */}
                  <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-red-100 dark:bg-red-900 rounded flex items-center justify-center">
                            <FileText className="h-3 w-3 text-red-600 dark:text-red-300" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            Uploaded Files
                          </span>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                          5 files
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* FILE ITEM TEMPLATE */}
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-600 dark:text-red-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            Product Requirements.pdf
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            2.4 MB • Jan 12, 2025
                          </p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                          processed
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-600 dark:text-red-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            User Research Analysis.pdf
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            1.8 MB • Jan 10, 2025
                          </p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                          processed
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-600 dark:text-red-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            Technical Specifications.pdf
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            3.2 MB • Jan 8, 2025
                          </p>
                        </div>
                        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded text-xs font-medium">
                          processing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-wave">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* ============================= */}
      {/* FEATURES SECTION (with dark) */}
      {/* ============================= */}

      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-red-50/20 dark:from-gray-900 dark:to-gray-800/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage, search, and collaborate
              efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl hover:shadow-red-200/30 dark:hover:shadow-red-900/30 transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-xl shadow-red-300/50">
                  <Upload className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Smart PDF Upload
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Drag and drop your PDFs with automatic extraction and
                  categorization.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:shadow-red-200/30 dark:hover:shadow-red-900/30 transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-xl shadow-red-300/50">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Semantic Search
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Find exactly what you need with AI-powered contextual search.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:shadow-red-200/30 dark:hover:shadow-red-900/30 transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-xl shadow-red-300/50">
                  <FolderOpen className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Workspace Management
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Organize documents, manage workspaces, and collaborate easily.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================== */}
      {/* PRICING SECTION (with dark) */}
      {/* =========================== */}

      <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start free and upgrade as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* FREE PLAN */}
            <Card className="hover:shadow-xl hover:shadow-red-200/30 dark:hover:shadow-red-900/30 transition-all duration-300 border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Free
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    $0
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">per month</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Up to 5 PDFs
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Basic search
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />1 workspace
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-700 dark:text-gray-200 hover:border-red-200 hover:bg-red-50/50 dark:hover:bg-gray-700/50 transition-all duration-300"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* PRO PLAN */}
            <Card className="hover:shadow-2xl hover:shadow-red-300/50 dark:hover:shadow-red-900/50 transition-all duration-300 border-red-100 dark:border-red-800 relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:-translate-y-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-500" />

              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="mb-2 bg-gradient-to-r from-red-400 to-red-500 text-white shadow-xl shadow-red-300/50">
                    Most Popular
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Pro
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    $19
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">per month</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Unlimited PDFs
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    AI semantic search
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Unlimited workspaces
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Priority support
                  </li>
                </ul>

                <Button className="w-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/50 transition-all duration-300 transform hover:-translate-y-1">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            {/* ENTERPRISE PLAN */}
            <Card className="hover:shadow-xl hover:shadow-red-200/30 dark:hover:shadow-red-900/30 transition-all duration-300 border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Enterprise
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    $99
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">per month</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Team collaboration
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    Custom integrations
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-700 dark:text-gray-200 hover:border-red-200 hover:bg-red-50/50 dark:hover:bg-gray-700/50 transition-all duration-300"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section (dark enabled automatically because it's already red-based) */}
      <section className="py-20 bg-gradient-to-r from-red-400 to-red-500 dark:from-red-600 dark:to-red-700 relative overflow-hidden">
        <div className="landing-waveb">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto mt-32 mb-40 px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="h-12 w-12 text-white/90 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Supercharge Your Document Workflows?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of teams already using NoteAble AI.
          </p>

          <Button
            size="lg"
            className="bg-white text-red-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-red-300 dark:hover:bg-gray-800 shadow-xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 transform hover:-translate-y-1"
            asChild
          >
            <Link href={"/dashboard"}>
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="landing-wave">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      <Footer />
    </div>
  );
}
