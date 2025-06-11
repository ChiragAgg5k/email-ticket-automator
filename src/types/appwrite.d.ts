import { Models } from "appwrite";

export type Tickets = Models.Document & {
  subject: string;
  body: string;
  email: string;
  status: string;
  priority: string | null;
  userId: string;
  rawJson: string | null;
  processing_status: string;
  description: string | null;
};

export type Waitlist = Models.Document & {
  full_name: string;
  work_email: string;
  company_name: string;
  monthly_support_tickets: string;
};
