import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero Text Content */}
          <div className="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-helpdesk-dark mb-6 leading-tight">
              <span className="text-helpdesk-blue">Automate</span> Your Helpdesk
              with <span className="text-helpdesk-teal">Email Parsing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform incoming customer emails into structured support tickets
              instantly. Streamline workflows, improve response times, and
              provide better customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-helpdesk-blue hover:bg-blue-600 transition-colors text-lg py-6 px-8"
                asChild
              >
                <Link to="/auth">Start Free Trial</Link>
              </Button>
              <Button
                variant="outline"
                className="border-helpdesk-teal text-helpdesk-teal hover:bg-helpdesk-teal/10 text-lg py-6 px-8"
              >
                Request Demo
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2 animate-fade-in">
            <div className="relative rounded-lg shadow-xl overflow-hidden bg-white p-2 border border-gray-200">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 flex items-center px-2 rounded-t-lg">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="pt-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-helpdesk-blue mr-3">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        From: customer@example.com
                      </p>
                      <p className="font-medium">
                        Technical issue with your software
                      </p>
                    </div>
                  </div>
                  <div className="h-24 bg-white rounded border border-gray-200 p-2 text-sm text-gray-600 mb-4">
                    Hi Support Team, I'm experiencing an error when trying to
                    export reports. The system shows "Error 404" when I click
                    the export button. Priority: High. Thanks, John
                  </div>
                  <div className="flex justify-center">
                    <svg
                      className="w-6 h-6 text-helpdesk-teal animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
                <div className="my-4 flex justify-center">
                  <div className="h-10 w-10 rounded-full bg-helpdesk-teal flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="bg-white rounded border border-gray-200 p-3 mb-3">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">
                        New Support Ticket #12345
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        High Priority
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Customer:</strong> John
                      </p>
                      <p>
                        <strong>Email:</strong> customer@example.com
                      </p>
                      <p>
                        <strong>Issue:</strong> Error 404 when exporting reports
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Assigned to: Support Team</span>
                    <span className="text-helpdesk-blue">View Ticket</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
