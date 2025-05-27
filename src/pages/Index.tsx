import ContactSection from "@/components/ContactSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default Index;
