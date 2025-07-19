import { FormField } from "@/types";

export const REGISTER_FORM_FIELDS: FormField[] = [
  // General Information
  {
    section: "General Information",
    fields: [
      {
        name: "firstName",
        label: "First Name *",
        type: "text",
        required: true,
      },
      {
        name: "middleName",
        label: "Middle Name",
        type: "text",
        required: false,
      },
      { name: "lastName", label: "Last Name *", type: "text", required: true },
      { name: "username", label: "Username *", type: "text", required: true },
      { name: "email", label: "Email *", type: "email", required: true },
      {
        name: "password",
        label: "Password *",
        type: "password",
        required: true,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password *",
        type: "password",
        required: true,
      },
      { name: "phone", label: "Phone Number", type: "tel", required: false },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: false,
        options: ["Male", "Female", "Other", "Prefer not to say"],
      },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        required: false,
        options: ["Single", "Married", "Other"],
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
  },

  // Location Information
  {
    section: "Location Information",
    fields: [
      {
        name: "country",
        label: "Country *",
        type: "select",
        required: true,
        options: [
          "Nepal",
          "India",
          "United States",
          "United Kingdom",
          "Canada",
          // Add more countries as needed
        ],
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
  },

  // Other Information
  {
    section: "Other Information",
    fields: [
      {
        name: "roles",
        label: "Select Roles *",
        type: "multiselect",
        required: true,
        options: [
          "Super Admin",
          "Admin",
          "Tenant Admin",
          "Instructor",
          "Student",
          "Parent",
          "Guest",
        ],
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
        label: "I agree to Terms & Conditions *",
        type: "checkbox",
        required: true,
      },
      { name: "captcha", label: "Captcha *", type: "text", required: true }, // You can replace with real captcha component later
    ],
  },
];
