
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Thanks for your interest!",
      description: "We'll be in touch soon with more information about how our email parsing solution can help your business.",
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  return (
    <section className="py-16 md:py-24 bg-helpdesk-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Customer Support?
            </h2>
            <p className="text-xl text-gray-300">
              Get started with our email parsing solution and see the difference in your support workflow.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="bg-white/20 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Work Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="bg-white/20 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    type="text"
                    required
                    placeholder="Your Company"
                    className="bg-white/20 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tickets" className="block text-sm font-medium">
                    Monthly Support Tickets
                  </label>
                  <select
                    id="tickets"
                    required
                    className="w-full rounded-md bg-white/20 border-white/20 text-white placeholder:text-gray-400 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-helpdesk-teal"
                  >
                    <option value="" disabled selected className="text-gray-800">
                      Select volume
                    </option>
                    <option value="less-than-100" className="text-gray-800">
                      Less than 100
                    </option>
                    <option value="100-500" className="text-gray-800">
                      100 - 500
                    </option>
                    <option value="500-1000" className="text-gray-800">
                      500 - 1,000
                    </option>
                    <option value="1000+" className="text-gray-800">
                      More than 1,000
                    </option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="bg-helpdesk-teal hover:bg-teal-600 transition-colors text-lg py-6 px-8 w-full sm:w-auto"
                >
                  Request a Demo
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-12 text-center text-gray-300">
            <p>
              No credit card required. 14-day free trial available for all new accounts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
