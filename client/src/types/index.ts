import { IconType } from "react-icons";

export type NavItem = {
  label: string;
  href?: string; // optional, because some items may have actions instead
  icon?: IconType;
  cta?: boolean;
  action?: "logout" | "customAction"; // optional action metadata
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
  | "textarea"
  | "captcha";

export type FormField = {
  name: string;
  label: string | React.ReactNode; // ✅ Allow JSX labels
  type: FieldType;
  required: boolean;
 
  options?: { id: string; label: string }[];
};

export type FormSection = {
  section: string;
  fields: FormField[];
  fieldGroups?: string[][]; // layout per row
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
  profilePicture?: File | string | null;
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

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
};

export type ResendOtpPayload = {
  email: string;
  purpose?: string;
};

export type UserData = {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  email?: string;
  gender?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  profilePicture?: string | null;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  address1?: string;
  address2?: string;
  roles?: string[];
  organization?: string;
  department?: string;
  jobTitle?: string;
  howDidYouHear?: string;
  accessToken?: string;
  message?: string;
};


export type User = {
  data?: UserData;
};

export type UserResponse = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  accessToken?: string;
  message?: string; 
  success?: boolean;
  data?: User
};
