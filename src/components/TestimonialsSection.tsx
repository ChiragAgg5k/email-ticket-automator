import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  position,
  company,
}) => (
  <Card className="border border-gray-200 hover:shadow-lg transition-shadow h-full">
    <CardContent className="p-6 h-full flex flex-col">
      <div className="mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            ★
          </span>
        ))}
      </div>
      <blockquote className="text-gray-600 italic mb-6 flex-grow">
        "{quote}"
      </blockquote>
      <div>
        <p className="font-bold text-helpdesk-dark">{author}</p>
        <p className="text-sm text-gray-500">
          {position}, {company}
        </p>
      </div>
    </CardContent>
  </Card>
);

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        "This email parsing solution cut our ticket processing time in half. What used to take our team hours now happens automatically in seconds.",
      author: "Sarah Johnson",
      position: "Support Director",
      company: "TechSolutions Inc.",
    },
    {
      quote:
        "The accuracy of the parsing engine is impressive. It correctly categorizes 98% of our incoming support requests, which has dramatically improved our response times.",
      author: "Michael Chen",
      position: "Customer Support Manager",
      company: "CloudServe",
    },
    {
      quote:
        "Setting up the templates was incredibly easy, even for our non-technical staff. We were up and running in less than a day with noticeable improvements.",
      author: "Emma Rodriguez",
      position: "IT Administrator",
      company: "Global Retail Group",
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-helpdesk-dark mb-4">
            Trusted by Support Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say about our email parsing solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
