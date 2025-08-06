import { FormSection, FormField } from "@/types";

const toOptions = (options: string[]) =>
  options.map((val) => ({ id: val, label: val }));

export const REGISTER_FORM_FIELDS: FormSection[] = [
  {
    section: "General Information",
    fields: [
      { name: "firstName", label: "First Name ", type: "text", required: true },
      {
        name: "middleName",
        label: "Middle Name",
        type: "text",
        required: false,
      },
      { name: "lastName", label: "Last Name ", type: "text", required: true },
      { name: "username", label: "Username ", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: false },
      { name: "email", label: "Email ", type: "email", required: true },
      {
        name: "password",
        label: "Password ",
        type: "password",
        required: true,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password ",
        type: "password",
        required: true,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: false,
        options: toOptions(["Male", "Female", "Other", "Prefer not to say"]),
      },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        required: false,
        options: toOptions(["Single", "Married", "Other"]),
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
        required: false,
      },
      {
        name: "profilePicture",
        label: "Profile Picture",
        type: "file",
        required: false,
      },
    ],
    fieldGroups: [
      ["firstName", "middleName", "lastName"],
      ["username", "phone"],
      ["email", "password", "confirmPassword"],
      ["gender", "maritalStatus"],
      ["dateOfBirth", "profilePicture"],
    ],
  },
  {
    section: "Location Information",
    fields: [
      {
        name: "country",
        label: "Country ",
        type: "select",
        required: true,
        options: toOptions([
          "Nepal",
          "India",
          "United States",
          "United Kingdom",
          "Canada",
        ]),
      },
      { name: "state", label: "State/Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
      { name: "zip", label: "Zip/Postal Code", type: "text", required: false },
      {
        name: "address1",
        label: "Address Line 1",
        type: "text",
        required: false,
      },
      {
        name: "address2",
        label: "Address Line 2",
        type: "text",
        required: false,
      },
    ],
    fieldGroups: [
      ["country"],
      ["state", "city"],
      ["zip"],
      ["address1"],
      ["address2"],
    ],
  },
  {
    section: "Other Information",
    fields: [
      {
        name: "roles",
        label: "Select Roles",
        type: "multiselect",
        required: true,
        options: toOptions([
          "Super Admin",
          "Admin",
          "Tenant Admin",
          "Instructor",
          "Student",
          "Parent",
          "Guest",
        ]),
      },
      {
        name: "organization",
        label: "Organization/Company",
        type: "text",
        required: false,
      },
      {
        name: "department",
        label: "Department",
        type: "text",
        required: false,
      },
      {
        name: "jobTitle",
        label: "Job Title/Position",
        type: "text",
        required: false,
      },
      {
        name: "howDidYouHear",
        label: "How did you hear about us?",
        type: "textarea",
        required: false,
      },
      {
        name: "terms",
        label: "I agree to Terms & Conditions ",
        type: "checkbox",
        required: true,
      },
      { name: "captcha", label: "Captcha", type: "text", required: true },
    ],
    fieldGroups: [
      ["roles"],
      ["organization", "jobTitle", "department"],
      ["howDidYouHear"],
      ["terms"],
      ["captcha"],
    ],
  },
];

export const LOGIN_FORM_FIELDS: FormField[] = [
  { name: "email", label: "Email ", type: "email", required: true },
  { name: "password", label: "Password ", type: "password", required: true },
];
