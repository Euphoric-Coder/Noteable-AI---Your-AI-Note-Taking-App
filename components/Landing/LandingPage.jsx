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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-red-100/40 to-white py-20 lg:py-32">
        {/* Top Wavy Background */}
        <div className="absolute inset-0">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0V160Z"
              fill="url(#topWave)"
              fillOpacity="0.3"
            />
            <path
              d="M0,320L48,298.7C96,277,192,235,288,229.3C384,224,480,256,576,272C672,288,768,288,864,277.3C960,267,1056,245,1152,245.3C1248,245,1344,267,1392,277.3L1440,288V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0V320Z"
              fill="url(#topWave)"
              fillOpacity="0.2"
            />
            <defs>
              <linearGradient id="topWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef2f2" />
                <stop offset="50%" stopColor="#fee2e2" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-red-50/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-red-100 text-red-500 bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Document Management
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Store, Search, and{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Understand
            </span>{" "}
            Your PDFs with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your document workflow with intelligent semantic search,
            AI-powered insights, and seamless workspace management. Upload,
            organize, and discover knowledge like never before.
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
              className="border-gray-200 hover:border-red-200 bg-white/80 backdrop-blur-sm hover:bg-red-50/50 shadow-md hover:shadow-lg hover:shadow-red-100/40 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative mx-auto max-w-4xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-red-200/40 border border-gray-100 p-1">
              <div className="bg-gradient-to-br from-gray-50 to-red-50/30 rounded-xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Dashboard
                      </h2>
                      <p className="text-gray-600 text-sm">
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
                  {/* Stats Cards Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">
                          Total Files
                        </span>
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                          <FileText className="h-3 w-3 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-xs text-green-600">
                        +15% this month
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Storage</span>
                        <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                          <Zap className="h-3 w-3 text-purple-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        24MB
                      </div>
                      <div className="text-xs text-gray-500">60% used</div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Searches</span>
                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                          <Search className="h-3 w-3 text-green-600" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">89</div>
                      <div className="text-xs text-green-600">
                        +32% this week
                      </div>
                    </div>
                  </div>

                  {/* Files Section */}
                  <div className="bg-white/80 rounded-lg shadow-sm border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-red-100 rounded flex items-center justify-center">
                            <FileText className="h-3 w-3 text-red-600" />
                          </div>
                          <span className="font-medium text-gray-900 text-sm">
                            Uploaded Files
                          </span>
                        </div>
                        <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          5 files
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {/* File Items */}
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Product Requirements.pdf
                          </p>
                          <p className="text-xs text-gray-500">
                            2.4 MB • Jan 12, 2025
                          </p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          processed
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            User Research Analysis.pdf
                          </p>
                          <p className="text-xs text-gray-500">
                            1.8 MB • Jan 10, 2025
                          </p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          processed
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Technical Specifications.pdf
                          </p>
                          <p className="text-xs text-gray-500">
                            3.2 MB • Jan 8, 2025
                          </p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
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
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-red-50/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage, search, and collaborate on your
              documents efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-xl shadow-red-300/50">
                  <Upload className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Smart PDF Upload
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Drag and drop your PDFs with automatic text extraction,
                  metadata processing, and intelligent categorization.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-xl shadow-red-300/50">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Semantic Search
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find exactly what you need with AI-powered semantic search
                  that understands context and meaning, not just keywords.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-xl shadow-red-300/50">
                  <FolderOpen className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Workspace Management
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Organize documents into workspaces, collaborate with team
                  members, and maintain perfect document organization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core AI
              features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 border-gray-100 bg-white/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Free
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $0
                  </div>
                  <p className="text-gray-600">per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Up to 5 PDFs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Basic search</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">1 workspace</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-gray-200 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="hover:shadow-2xl hover:shadow-red-300/50 transition-all duration-300 border-red-100 relative overflow-hidden bg-white/90 backdrop-blur-sm hover:-translate-y-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-500" />
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="mb-2 bg-gradient-to-r from-red-400 to-red-500 text-white shadow-xl shadow-red-300/50">
                    Most Popular
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $19
                  </div>
                  <p className="text-gray-600">per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Unlimited PDFs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">AI semantic search</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Unlimited workspaces</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-200/50 transition-all duration-300 transform hover:-translate-y-1">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 border-gray-100 bg-white/80 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Enterprise
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $99
                  </div>
                  <p className="text-gray-600">per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Custom integrations</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-gray-200 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Wavy Divider After Pricing */}
      <section className="relative overflow-hidden">
        <svg
          className="w-full h-24 lg:h-32"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V64Z"
            fill="url(#bottomWave)"
          />
          <path
            d="M0,32L48,37.3C96,43,192,53,288,48C384,43,480,21,576,16C672,11,768,21,864,32C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V32Z"
            fill="url(#bottomWave)"
            fillOpacity="0.7"
          />
          <defs>
            <linearGradient id="bottomWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef2f2" />
              <stop offset="50%" stopColor="#fee2e2" />
              <stop offset="100%" stopColor="#fecaca" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-400 to-red-500 relative overflow-hidden">
        {/* Bottom Wavy Background */}
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 w-full h-full"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,640L48,624C96,608,192,576,288,586.7C384,597,480,651,576,650.7C672,651,768,597,864,592C960,587,1056,629,1152,634.7C1248,640,1344,608,1392,592L1440,576V800H1392C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800H0V640Z"
              fill="url(#ctaWave)"
              fillOpacity="0.2"
            />
            <path
              d="M0,480L48,501.3C96,523,192,565,288,570.7C384,576,480,544,576,528C672,512,768,512,864,522.7C960,533,1056,555,1152,554.7C1248,555,1344,533,1392,522.7L1440,512V800H1392C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800H0V480Z"
              fill="url(#ctaWave)"
              fillOpacity="0.1"
            />
            <defs>
              <linearGradient id="ctaWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#fef2f2" />
                <stop offset="100%" stopColor="#fee2e2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="h-12 w-12 text-white/90 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Supercharge Your Document Workflows?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of teams already using NoteAble AI to unlock the
            power of their documents with intelligent search and AI insights.
          </p>
          <Button
            size="lg"
            className="bg-white text-red-500 hover:bg-gray-50 shadow-xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 transform hover:-translate-y-1"
            asChild
          >
            <Link href={"/dashboard"}>
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
