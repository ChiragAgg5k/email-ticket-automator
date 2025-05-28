import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

const Error: React.FC = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 flex items-center justify-center h-screen">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="flex flex-col items-center space-y-2">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <h1 className="text-2xl font-semibold text-destructive">
                {error || "An Error Occurred"}
              </h1>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {errorDescription && (
                <p className="text-muted-foreground">{errorDescription}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Please try again or contact support if the problem persists.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Error;
