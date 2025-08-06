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



