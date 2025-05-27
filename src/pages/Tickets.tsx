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
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { type Models } from "appwrite";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileJson,
  FileText,
  Loader2,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Ticket = {
  id: string;
  subject: string;
  email: string;
  status: string;
  priority: string;
  createdAt: string;
};

type TicketFormData = {
  email: string;
  subject: string;
  body: string;
  priority: string;
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
const PriorityBadge = ({ priority }: { priority: string }) => {
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

const TicketDetail = ({ ticket }: { ticket: Ticket }) => {
  const [showRawJson, setShowRawJson] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-1">{ticket.subject}</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>From: {ticket.email}</span>
            <span>•</span>
            <span>Created: {formatDate(ticket.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
      </div>

      <div className="border-t border-b py-4">
        <h3 className="font-medium mb-2">Ticket Description</h3>
        <p className="text-gray-700">
          This is a placeholder description for ticket {ticket.id}. In a real
          application, this would contain the actual content of the ticket from
          the database.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setShowRawJson(!showRawJson)}
          variant="outline"
          className="flex items-center gap-2"
        >
          {showRawJson ? <FileText /> : <FileJson />}
          {showRawJson ? "Hide Raw JSON" : "Show Raw JSON"}
        </Button>
      </div>

      {showRawJson && (
        <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
          <pre className="text-xs">{JSON.stringify(ticket, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const Tickets = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const {
    isPending,
    error,
    data: tickets,
    refetch,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => database.listDocuments("main", "tickets"),
    retry: false,
  });

  const mappedTickets: Ticket[] =
    tickets?.documents.map((doc: Models.Document) => ({
      id: doc.$id,
      subject: doc.subject,
      email: doc.email,
      status: doc.status,
      priority: doc.priority,
      createdAt: doc.$createdAt,
    })) || [];

  // Form handling
  const form = useForm({
    defaultValues: {
      email: "",
      subject: "",
      body: "",
      priority: "medium",
    },
  });

  const handleSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Email ticket submitted successfully", {
        description: "Your support request has been received.",
      });

      // Reset the form
      form.reset();
    } catch (error) {
      toast.error("Failed to submit ticket", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTicketClick = (ticket: Ticket) => {
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
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {error ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-20 p-0">
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
                        colSpan={6}
                        className="text-center h-20 text-muted-foreground"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={16} />
                          Loading...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    mappedTickets.map((ticket) => (
                      <TableRow
                        key={ticket.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleTicketClick(ticket)}
                      >
                        <TableCell className="font-medium">
                          {ticket.id}
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.email}</TableCell>
                        <TableCell>
                          <StatusBadge status={ticket.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={ticket.priority} />
                        </TableCell>
                        <TableCell>{formatDate(ticket.createdAt)}</TableCell>
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
          <CardHeader>
            <CardTitle>Create New Ticket</CardTitle>
            <CardDescription>
              Submit your support request and we'll get back to you shortly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
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

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <div className="flex gap-4">
                          {["low", "medium", "high"].map((priority) => (
                            <Button
                              key={priority}
                              type="button"
                              variant={
                                field.value === priority ? "default" : "outline"
                              }
                              className={cn(
                                field.value === priority &&
                                  (priority === "high"
                                    ? "bg-red-600 hover:bg-red-700"
                                    : priority === "medium"
                                      ? "bg-yellow-600 hover:bg-yellow-700"
                                      : "bg-green-600 hover:bg-green-700"),
                                "flex-1",
                              )}
                              onClick={() =>
                                form.setValue("priority", priority)
                              }
                            >
                              {priority.charAt(0).toUpperCase() +
                                priority.slice(1)}
                            </Button>
                          ))}
                        </div>
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
            {selectedTicket && <TicketDetail ticket={selectedTicket} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Tickets;
