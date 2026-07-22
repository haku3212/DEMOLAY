export type BusinessSubmissionStatus = "pending" | "approved" | "rejected" | "suspended";

export type BusinessSubmissionInsert = {
  owner_name: string;
  business_name: string;
  category: string;
  specialty: string;
  department: string;
  city: string;
  phone: string;
  whatsapp: string;
  description: string;
  image_url?: string | null;
  image_path?: string | null;
  publish_authorization: boolean;
  status?: BusinessSubmissionStatus;
};

export type BusinessSubmission = BusinessSubmissionInsert & {
  id: string;
  created_at: string;
  updated_at: string;
  status: BusinessSubmissionStatus;
  reviewed_at: string | null;
  reviewed_by: string | null;
  review_notes: string | null;
};

export type ProfileReportStatus = "pending" | "reviewed" | "dismissed";

export type ProfileReport = {
  id: string;
  created_at: string;
  profile_id: string;
  profile_name: string;
  profile_slug: string;
  reporter_name: string | null;
  reporter_contact: string | null;
  reason: string;
  status: ProfileReportStatus;
  reviewed_at: string | null;
};
