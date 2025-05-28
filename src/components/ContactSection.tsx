import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { database } from "@/lib/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ID } from "appwrite";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const waitlistSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  work_email: z
    .string()
    .email("Invalid email")
    .refine((email) => {
      // Basic work email validation
      const personalDomains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
      ];
      const domain = email.split("@")[1];
      return !personalDomains.includes(domain);
    }, "Please use a work email address"),
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  monthly_support_tickets: z.string().min(1, "Please select a volume"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  // Rate limiting check
  const canSubmit = () => {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    return submissionCount < 3 && timeSinceLastSubmission > 3600000; // 1 hour cooldown
  };

  const { mutate: createTicket } = useMutation({
    mutationFn: (data: WaitlistFormData) => {
      return database.createDocument("main", "waitlist", ID.unique(), data);
    },
    onSuccess: () => {
      toast({
        title: "Thanks for your interest!",
        description:
          "We'll be in touch soon with more information about how our email parsing solution can help your business.",
      });
      setSubmitted(true);
      setSubmissionCount((prev) => prev + 1);
      setLastSubmissionTime(Date.now());
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
      });
      setIsSubmitting(false);
    },
  });

  // Reset submission count after 24 hours
  useEffect(() => {
    const resetInterval = setInterval(
      () => {
        setSubmissionCount(0);
      },
      24 * 60 * 60 * 1000,
    );

    return () => clearInterval(resetInterval);
  }, []);

  const onSubmit = (data: WaitlistFormData) => {
    if (!canSubmit()) {
      toast({
        title: "Submission limit reached",
        description:
          "Please try again later. You can submit up to 3 times per hour.",
      });
      return;
    }

    setIsSubmitting(true);
    createTicket(data);
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-helpdesk-dark text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Customer Support?
            </h2>
            <p className="text-xl text-gray-300">
              Get started with our email parsing solution and see the difference
              in your support workflow.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <Input
                    id="full_name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="bg-white/20 border-white/20 text-white placeholder:text-gray-400"
                    {...register("full_name")}
                  />
                  {errors.full_name && (
                    <p className="text-red-400 text-sm">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="work_email"
                    className="block text-sm font-medium"
                  >
                    Work Email
                  </label>
                  <Input
                    id="work_email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="bg-white/20 border-white/20 text-white placeholder:text-gray-400"
                    {...register("work_email")}
                  />
                  {errors.work_email && (
                    <p className="text-red-400 text-sm">
                      {errors.work_email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="company_name"
                    className="block text-sm font-medium"
                  >
                    Company Name
                  </label>
                  <Input
                    id="company_name"
                    type="text"
                    required
                    placeholder="Your Company"
                    className="bg-white/20 border-white/20 text-white placeholder:text-gray-400"
                    {...register("company_name")}
                  />
                  {errors.company_name && (
                    <p className="text-red-400 text-sm">
                      {errors.company_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="monthly_support_tickets"
                    className="block text-sm font-medium"
                  >
                    Monthly Support Tickets
                  </label>
                  <select
                    id="monthly_support_tickets"
                    required
                    className="w-full rounded-md bg-white/20 border-white/20 text-white placeholder:text-gray-400 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-helpdesk-teal"
                    {...register("monthly_support_tickets")}
                  >
                    <option value="" disabled className="text-gray-800">
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
                  {errors.monthly_support_tickets && (
                    <p className="text-red-400 text-sm">
                      {errors.monthly_support_tickets.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={submitted || isSubmitting || !canSubmit()}
                  className="bg-helpdesk-teal hover:bg-teal-600 transition-colors text-lg py-6 px-8 w-full sm:w-auto"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : submitted
                      ? "Submitted"
                      : "Request a Demo"}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center text-gray-300">
            <p>
              No credit card required. 14-day free trial available for all new
              accounts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
