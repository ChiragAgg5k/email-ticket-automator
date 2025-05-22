
import React from "react";
import { Check } from "lucide-react";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Email Parsing Setup",
      description: "Set up your parsing mailbox and define templates to extract key information from incoming emails.",
      details: [
        "Register a unique parsing email address",
        "Create parsing templates with no coding required",
        "Configure field mapping for your ticket system"
      ]
    },
    {
      number: "02",
      title: "Automatic Ticket Creation",
      description: "Incoming emails are parsed and converted into structured support tickets with all relevant information.",
      details: [
        "Extract customer info, priorities, and issue details",
        "Handle attachments automatically",
        "Convert unstructured emails into organized data"
      ]
    },
    {
      number: "03",
      title: "Smart Routing & Assignment",
      description: "Tickets are categorized and assigned to the right team members based on extracted information.",
      details: [
        "Route tickets based on keywords or categories",
        "Set priority levels automatically",
        "Assign to teams or individuals based on expertise"
      ]
    },
    {
      number: "04",
      title: "Resolution & Analysis",
      description: "Track ticket resolution and analyze performance data to continuously improve your support process.",
      details: [
        "Monitor response and resolution times",
        "Identify common issues and bottlenecks",
        "Optimize templates and workflows over time"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-helpdesk-dark mb-4">
            How Our Email Parsing Solution Works
          </h2>
          <p className="text-xl text-gray-600">
            A simple, four-step process to transform your customer support experience
          </p>
        </div>

        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection lines between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-helpdesk-blue to-helpdesk-teal transform -translate-x-1/2 z-0"></div>
              )}
              
              <div className="bg-white rounded-xl shadow-lg p-6 relative z-10 h-full flex flex-col">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-helpdesk-blue/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-helpdesk-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-helpdesk-teal mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
