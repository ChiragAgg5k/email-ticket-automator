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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { database } from "@/lib/appwrite";
import useAuthStore from "@/lib/stores/authStore";
import { cn } from "@/lib/utils";
import type { Tickets as TicketType } from "@/types/appwrite";
import { faker } from "@faker-js/faker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ID, Permission, Role, type Models } from "appwrite";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileJson,
  FileText,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type TicketFormData = {
  email: string;
  subject: string;
  body: string;
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor, textColor, icon;

  switch (status) {
    case "open":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      icon = <AlertCircle className="w-3 h-3 mr-1" />;
      break;
    case "in-progress":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      icon = <Clock className="w-3 h-3 mr-1" />;
      break;
    case "closed":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      icon = <CheckCircle className="w-3 h-3 mr-1" />;
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      icon = null;
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Priority component
const PriorityBadge = ({ priority }: { priority: string | null }) => {
  // If priority is null or undefined, don't show anything
  if (!priority) {
    return null;
  }

  const colors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const bgColor =
    colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const TicketDetail = ({ ticket }: { ticket: TicketType }) => {
  const [showRawJson, setShowRawJson] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-1">{ticket.subject}</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>From: {ticket.email}</span>
            <span>•</span>
            <span>Created: {formatDate(ticket.$createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
      </div>

      {/* AI Ticket Description Section - Only show when processing is completed and description exists */}
      {ticket.processing_status === "completed" && ticket.description && (
        <div className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-t-lg"></div>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Ticket Analysis
                </h3>
                <div className="flex items-center gap-1 px-2 py-1 bg-white/60 rounded-full">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-medium text-purple-700">
                    AI Generated
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed pl-4 font-medium">
                  {ticket.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-b py-4">
        <h3 className="font-medium mb-2">Ticket Body</h3>
        <p className="text-gray-700">{ticket.body}</p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setShowRawJson(!showRawJson)}
          variant="outline"
          className="flex items-center gap-2"
          disabled={!ticket.rawJson}
        >
          {showRawJson ? <FileText /> : <FileJson />}
          {showRawJson ? "Hide Raw JSON" : "Show Raw JSON"}
        </Button>
      </div>

      <div className="flex justify-center items-center">
        {showRawJson && ticket.rawJson && (
          <div className="bg-gray-100 p-4 rounded-md overflow-x-auto max-h-60 max-w-xl border border-gray-200">
            <pre className="text-xs font-mono whitespace-pre m-0">
              {(() => {
                try {
                  // Try to pretty-print if it's valid JSON
                  const parsedJson =
                    typeof ticket.rawJson === "string"
                      ? JSON.parse(ticket.rawJson)
                      : ticket.rawJson;

                  // If HtmlBody exists, format it separately
                  if (parsedJson.HtmlBody) {
                    const { HtmlBody, ...restJson } = parsedJson;
                    const formattedRest = JSON.stringify(restJson, null, 2);

                    // Parse the nested JSON in HtmlBody if it's a string
                    let formattedHtml;
                    try {
                      const parsedHtmlBody =
                        typeof HtmlBody === "string"
                          ? JSON.parse(HtmlBody)
                          : HtmlBody;
                      formattedHtml = JSON.stringify(parsedHtmlBody, null, 2);
                    } catch (e) {
                      formattedHtml = JSON.stringify(HtmlBody, null, 2);
                    }

                    return (
                      <>
                        {`${formattedRest.slice(0, -1)},\n  "HtmlBody": `}
                        <span className="bg-blue-50 text-blue-700 px-1 rounded">
                          {formattedHtml}
                        </span>
                        {`\n}`}
                      </>
                    );
                  }

                  return JSON.stringify(parsedJson, null, 2);
                } catch (e) {
                  // Fallback to raw string if not valid JSON
                  return ticket.rawJson;
                }
              })()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const Tickets = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const {
    isPending,
    error,
    data: tickets,
    refetch,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => database.listDocuments("main", "tickets"),
    retry: false,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Check if any ticket is not completed
      const hasIncompleteTickets = data?.documents.some(
        (doc: Models.Document) => doc.processing_status !== "completed",
      );
      // If there are incomplete tickets, poll every 2 seconds
      return hasIncompleteTickets ? 2000 : false;
    },
  });
  const { user, loading } = useAuthStore();

  const { mutate: createTicket } = useMutation({
    mutationFn: (data: TicketFormData) => {
      if (!user) {
        throw new Error("User not found");
      }

      if (!data.email || !data.subject || !data.body) {
        throw new Error("Please fill in all fields");
      }

      return database.createDocument(
        "main",
        "tickets",
        ID.unique(),
        {
          email: data.email,
          subject: data.subject,
          body: data.body,
          status: "open",
          userId: user.$id,
          processing_status: "waiting",
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
          Permission.write(Role.user(user.$id)),
        ],
      );
    },
    onSuccess: () => {
      toast.success("Email ticket submitted successfully", {
        description: "Your support request has been received.",
      });
      form.reset();
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to submit ticket", {
        description: error.message,
      });
    },
  });

  // Delete mutation
  const { mutate: deleteTicket, isPending: isDeleting } = useMutation({
    mutationFn: (ticketId: string) =>
      database.deleteDocument("main", "tickets", ticketId),
    onSuccess: () => {
      toast.success("Ticket deleted successfully");
      setSelectedTicket(null);
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to delete ticket", {
        description: error.message,
      });
    },
  });

  const mappedTickets: TicketType[] =
    tickets?.documents.map((doc: Models.Document) => ({
      ...doc,
      subject: doc.subject,
      body: doc.body,
      email: doc.email,
      status: doc.status,
      priority: doc.priority,
      userId: doc.userId,
      rawJson: doc.rawJson || null,
      processing_status: doc.processing_status || "waiting",
      description: doc.description || null,
    })) || [];

  // Form handling
  const form = useForm({
    defaultValues: {
      email: "",
      subject: "",
      body: "",
    },
  });

  const handleTicketClick = (ticket: TicketType) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <h1 className="text-3xl font-bold text-helpdesk-dark mb-8">
          Support Dashboard
        </h1>

        {/* Tickets Table */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>
              View and manage your support tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Processing</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-20 p-0">
                        <div className="flex items-center justify-center h-full w-full gap-2">
                          <span className="text-muted-foreground">
                            Error loading tickets
                            {error?.message ? `: ${error.message}` : ""}
                          </span>
                          <button
                            onClick={() => refetch()}
                            className="text-sm text-muted-foreground border border-muted-foreground/20 rounded-md px-2 py-1"
                          >
                            Retry
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : isPending ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center h-20 text-muted-foreground"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={16} />
                          Loading...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : mappedTickets.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center h-20 text-muted-foreground"
                      >
                        No tickets have been created yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    mappedTickets.map((ticket) => (
                      <TableRow
                        key={ticket.$id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleTicketClick(ticket)}
                      >
                        <TableCell className="font-medium">
                          {ticket.$id}
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.email}</TableCell>
                        <TableCell>
                          <StatusBadge status={ticket.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={ticket.priority} />
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              ticket.processing_status === "completed" &&
                                "bg-green-100 text-green-800",
                              ticket.processing_status === "processing" &&
                                "bg-blue-100 text-blue-800",
                              ticket.processing_status === "waiting" &&
                                "bg-gray-100 text-gray-800",
                              ticket.processing_status === "failed" &&
                                "bg-red-100 text-red-800",
                            )}
                          >
                            {ticket.processing_status.charAt(0).toUpperCase() +
                              ticket.processing_status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(ticket.$createdAt)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Email Form */}
        <Card>
          <div className="flex items-start justify-between gap-4 px-6 py-6">
            <CardHeader className="p-0">
              <CardTitle>Create New Ticket</CardTitle>
              <CardDescription>
                Submit your support request and we'll get back to you shortly
              </CardDescription>
            </CardHeader>
            <Button
              type="button"
              className="mb-0"
              variant="outline"
              onClick={() => {
                // Generate a realistic support email
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                const email = faker.internet.email({
                  firstName,
                  lastName,
                  provider: "example.com",
                });
                // Use a realistic support subject
                const subject = faker.helpers.arrayElement([
                  "Cannot login to my account",
                  "Payment not going through",
                  "Feature request: Dark mode",
                  "Bug report: App crashes on launch",
                  "Account locked after password attempts",
                  "Requesting password reset",
                  "Not receiving verification email",
                  "Unable to update profile information",
                  "Subscription renewal issue",
                  "App is running slow",
                ]);
                // Generate a realistic support message body
                const body = faker.helpers.arrayElement([
                  `Hello,\n\nI'm having trouble with my account. ${faker.lorem.sentence()} Could you please assist?\n\nThanks,\n${firstName}`,
                  `Hi Support,\n\nI encountered an issue: ${faker.lorem.sentence()} Please let me know what I should do next.\n\nRegards,\n${firstName} ${lastName}`,
                  `Dear team,\n\n${faker.lorem.sentences({ min: 2, max: 3 })}\n\nThank you!`,
                  `Hello,\n\nI would like to request a new feature: ${faker.lorem.words(3)}. ${faker.lorem.sentence()}\n\nBest,\n${firstName}`,
                ]);
                form.setValue("email", email);
                form.setValue("subject", subject);
                form.setValue("body", body);
              }}
            >
              Generate Fake Data
            </Button>
          </div>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => createTicket(data))}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            loading
                              ? "Loading..."
                              : (user?.email ?? "email@example.com")
                          }
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief description of your issue"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about your issue..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-helpdesk-blue hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2" />
                      Submit Ticket
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Ticket Detail Dialog */}
        <Dialog
          open={!!selectedTicket}
          onOpenChange={(open) => !open && setSelectedTicket(null)}
        >
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
              <DialogDescription>
                View the complete information for this support ticket
              </DialogDescription>
            </DialogHeader>
            {selectedTicket && (
              <>
                <TicketDetail ticket={selectedTicket} />
                <div className="flex justify-end mt-6">
                  <Button
                    variant="destructive"
                    onClick={() => deleteTicket(selectedTicket.$id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Ticket"
                    )}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Tickets;
