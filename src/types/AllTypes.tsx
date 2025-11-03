/** @format */

export type EnquiryStatus = "pending" | "accepted" | "rejected";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  equipment: string;
  duration: string;
  description: string;
  status: EnquiryStatus;
  createdAt: Date;
}
