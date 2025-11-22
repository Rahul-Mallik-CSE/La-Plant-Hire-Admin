/** @format */

export type EnquiryStatus = "pending" | "approved" | "rejected" | "completed";

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IdealFor {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
  category: Category;
  price_per_day: string;
  ideal_for: IdealFor[];
  total_tonners: number | null;
  dementions: string | null;
  extra_note: string;
  image: string;
  is_featured: boolean;
  is_active: boolean;
  is_truck: boolean;
  is_equipment: boolean;
  is_material: boolean;
}

export interface Enquiry {
  id: number;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  project_discription: string;
  service: Service | null;
  servie_duration_days: number | null;
  status: EnquiryStatus;
  suburb: string | null;
  street_address: string | null;
  volume: string | null;
  fill_type_wanted: string | null;
  tripper_truck_access: string;
  comment: string | null;
  is_soild_request: boolean;
  created_at: string;
}

export interface EnquiriesResponse {
  success: boolean;
  message: string;
  data: Enquiry[];
}

export interface UpdateEnquiryStatusRequest {
  status: "approved" | "rejected";
}
