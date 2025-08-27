import { IconType } from "react-icons";

export type NavItem = {
  label: string;
  href: string;
  icon?: IconType;
  cta?: boolean;
};

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "select"
  | "multiselect"
  | "date"
  | "file"
  | "checkbox"
  | "textarea";

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: { id: string; label: string }[];
};

export type FormSection = {
  section: string;
  fields: FormField[];
  fieldGroups?: string[][]; // NEW: layout per row
};

export type SocialProvider = {
  id: string;
  label: string;
  LogoComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type RegisterPayload = {
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  profilePicture?: File | null;
  country: string;
  state?: string;
  city?: string;
  zip?: string;
  address1?: string;
  address2?: string;
  roles: string[];
  organization?: string;
  department?: string;
  jobTitle?: string;
  howDidYouHear?: string;
  terms: boolean;
  captcha: string;
};

export type ConfirmEmailPayload = {
  email: string;
  otp: string;
};

export type LoginPayload=  {
  email: string;
  password: string;
}

export type ForgotPasswordPayload ={
  email: string;
}

export type ResetPasswordPayload ={
  email: string;
  otp: string;
  newPassword: string;
}

export type ResendOtpPayload= {
  email: string;
  purpose?: string;
}

export type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  accessToken?: string;
};