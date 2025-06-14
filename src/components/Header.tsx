import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { account } from "@/lib/appwrite";
import useAuth from "@/lib/auth";
import { handleSmoothScroll } from "@/lib/utils";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === "/";

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Mail className="h-8 w-8 text-helpdesk-teal mr-2" />
              <span className="text-xl font-bold text-helpdesk-dark">
                Email Ticket
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isLanding && (
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-helpdesk-teal transition-colors"
                onClick={(e) => handleSmoothScroll(e, setIsMenuOpen)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-helpdesk-teal transition-colors"
                onClick={(e) => handleSmoothScroll(e, setIsMenuOpen)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-helpdesk-teal transition-colors"
                onClick={(e) => handleSmoothScroll(e, setIsMenuOpen)}
              >
                Testimonials
              </a>
              {loading ? (
                <Button className="bg-helpdesk-blue hover:bg-blue-600 transition-colors min-w-20">
                  <Loader2 className="animate-spin w-4 h-4" />
                </Button>
              ) : user ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-helpdesk-blue hover:bg-blue-600 transition-colors">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to logout?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-helpdesk-blue hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded text-center"
                        onClick={async () => {
                          await account.deleteSession("current");
                          toast.success("Logged out successfully");
                          window.location.href = "/";
                        }}
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button
                  className="bg-helpdesk-blue hover:bg-blue-600 transition-colors"
                  asChild
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              )}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isLanding && (
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isLanding && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-helpdesk-teal transition-colors"
                onClick={(e) => handleSmoothScroll(e, setIsMenuOpen)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-helpdesk-teal transition-colors"
                onClick={(e) => handleSmoothScroll(e, setIsMenuOpen)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-helpdesk-teal transition-colors"
                onClick={(e) => handleSmoothScroll(e, setIsMenuOpen)}
              >
                Testimonials
              </a>
              {user ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-helpdesk-blue hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded text-center">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to logout?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-helpdesk-blue hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded text-center"
                        onClick={async () => {
                          setIsMenuOpen(false);
                          await account.deleteSession("current");
                          toast.success("Logged out successfully");
                          window.location.href = "/";
                        }}
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Link
                  to="/auth"
                  className="bg-helpdesk-blue hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
