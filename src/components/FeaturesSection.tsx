import React from "react";
import { Calendar, Check, Clock, Mail, Search, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Card className="border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group h-full">
    <CardHeader className="pb-2">
      <div className="mb-4 p-2 bg-blue-50 rounded-md inline-block group-hover:bg-helpdesk-blue/10 transition-colors">
        {icon}
      </div>
      <CardTitle className="text-xl text-helpdesk-dark">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-gray-600">{description}</CardDescription>
    </CardContent>
  </Card>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Mail className="h-6 w-6 text-helpdesk-blue" />,
      title: "Automatic Ticket Creation",
      description:
        "Convert emails into support tickets instantly without manual intervention, ensuring no customer request falls through the cracks.",
    },
    {
      icon: <Search className="h-6 w-6 text-helpdesk-blue" />,
      title: "Intelligent Data Extraction",
      description:
        "Parse emails to identify key information like priority, category, and customer details using predefined templates and rules.",
    },
    {
      icon: <Clock className="h-6 w-6 text-helpdesk-blue" />,
      title: "Faster Response Times",
      description:
        "Reduce wait times with instant ticket creation and automatic routing to the right team or specialist for quick resolution.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-helpdesk-blue" />,
      title: "Smart Categorization",
      description:
        "Automatically categorize and prioritize tickets based on extracted information to streamline your support workflow.",
    },
    {
      icon: <Check className="h-6 w-6 text-helpdesk-blue" />,
      title: "No-Code Setup",
      description:
        "Configure your email parsing templates using our intuitive interface with no coding or technical expertise required.",
    },
    {
      icon: <User className="h-6 w-6 text-helpdesk-blue" />,
      title: "Improved Customer Experience",
      description:
        "Deliver consistent, fast support responses that increase customer satisfaction and build loyalty to your brand.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-helpdesk-dark mb-4">
            Streamline Your Support With Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Our email parsing technology transforms your support process, making
            it faster, more accurate, and more efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
