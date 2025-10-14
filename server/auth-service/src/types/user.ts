export interface User {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  username: string;
  phone?: string;
  email: string;
  password_hash: string;
  gender?: string;
  marital_status?: string;
  date_of_birth?: Date | null;
  profile_picture?: string;
  country: string;
  state?: string;
  city?: string;
  zip?: string;
  address1?: string;
  address2?: string;
  roles: string[];
  organization?: string;
  department?: string;
  job_title?: string;
  how_did_you_hear?: string;
  is_email_verified: boolean;
  created_at?: Date;
  updated_at?: Date;
}

