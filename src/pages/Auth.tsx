import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { account } from "@/lib/appwrite";
import { ID, OAuthProvider } from "appwrite";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type AuthFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const handleSubmit = async (data: AuthFormData) => {
    setIsLoading(true);

    try {
      if (isSignUp) {
        await account.create(ID.unique(), data.email, data.password, data.name);
        toast.success("Account created successfully!", {
          description: "Welcome to EmailTicket! Redirecting to dashboard...",
        });
      } else {
        await account.createEmailPasswordSession(data.email, data.password);
        toast.success("Signed in successfully!", {
          description: "Welcome back! Redirecting to dashboard...",
        });
      }

      navigate("/tickets");
    } catch (error) {
      toast.error(isSignUp ? "Failed to create account" : "Failed to sign in", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    form.reset();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-helpdesk-dark">
                  {isSignUp ? "Create Your Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription>
                  {isSignUp
                    ? "Start your free trial and automate your helpdesk"
                    : "Sign in to access your support dashboard"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                  >
                    {isSignUp && (
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="John Doe"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {isSignUp && (
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-helpdesk-blue hover:bg-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {isSignUp ? "Creating Account..." : "Signing In..."}
                        </>
                      ) : isSignUp ? (
                        "Start Free Trial"
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>
                {/* Google Sign In Button */}
                <div className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      account.createOAuth2Session(OAuthProvider.Google);
                    }}
                  >
                    {/* Google SVG Icon */}
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_17_40)">
                        <path
                          d="M47.5 24.5C47.5 22.5 47.3 20.7 47 19H24V29H37.5C36.8 32.2 34.7 34.7 31.7 36.3V42H39.3C44 38.1 47.5 32.1 47.5 24.5Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M24 48C30.6 48 36.1 45.9 39.3 42L31.7 36.3C29.9 37.4 27.7 38.1 24 38.1C18.7 38.1 14.1 34.7 12.5 30.1H4.7V35C8.1 42.1 15.5 48 24 48Z"
                          fill="#34A853"
                        />
                        <path
                          d="M12.5 30.1C11.9 28.3 11.5 26.3 11.5 24C11.5 21.7 11.9 19.7 12.5 17.9V13H4.7C2.7 16.7 1.5 20.7 1.5 24C1.5 27.3 2.7 31.3 4.7 35L12.5 30.1Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M24 9.9C27.1 9.9 29.3 11 30.7 12.3L39.4 4.1C36.1 1.1 30.6 0 24 0C15.5 0 8.1 5.9 4.7 13L12.5 17.9C14.1 13.3 18.7 9.9 24 9.9Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_17_40">
                          <rect width="48" height="48" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Sign in with Google
                  </Button>
                </div>
                {/* End Google Sign In Button */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                    <button
                      onClick={toggleAuthMode}
                      className="ml-2 text-helpdesk-blue hover:underline font-medium"
                    >
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
