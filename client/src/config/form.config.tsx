import { FormSection, FormField } from "@/types";
import DialogBox from "@/components/common/Dialog";

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
        label: (
          <>
            I agree to{" "}
            <DialogBox
              title="Terms & Conditions"
              description="Please review our Terms and Conditions carefully before continuing."
              trigger={
                <span className="text-blue-600 underline hover:text-orange-500 cursor-pointer">
                  Terms & Conditions
                </span>
              }
            >
              <p>
                Welcome to <strong>Academia Next</strong>. By registering or
                using our platform, you agree to comply with these Terms and
                Conditions. These govern your access, use, and participation in
                the services provided.
              </p>

              <h3 className="font-semibold text-base mt-3">
                1. User Responsibilities
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide accurate and complete registration information.</li>
                <li>Keep your account credentials confidential.</li>
                <li>Report any unauthorized use of your account.</li>
              </ul>

              <h3 className="font-semibold text-base mt-3">
                2. Acceptable Use
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Use the platform only for legitimate educational or
                  organizational purposes.
                </li>
                <li>
                  Do not post, upload, or share harmful, offensive, or illegal
                  content.
                </li>
                <li>Respect all other users and instructors.</li>
              </ul>

              <h3 className="font-semibold text-base mt-3">
                3. Intellectual Property
              </h3>
              <p>
                All content, including text, images, videos, and code, is owned
                by Academia Next or its licensors. You may not reproduce,
                distribute, or modify any content without explicit permission.
              </p>

              <h3 className="font-semibold text-base mt-3">
                4. Privacy and Data
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Your personal data is collected only for service improvement
                  and academic purposes.
                </li>
                <li>
                  We do not sell or share personal information with third
                  parties without consent.
                </li>
                <li>
                  By using the platform, you consent to our Privacy Policy.
                </li>
              </ul>

              <h3 className="font-semibold text-base mt-3">
                5. Payments and Subscriptions
              </h3>
              <p>
                Any paid features, courses, or subscriptions are subject to the
                applicable pricing, billing, and refund policies published on
                our platform. All payments are final unless otherwise stated.
              </p>

              <h3 className="font-semibold text-base mt-3">
                6. Limitation of Liability
              </h3>
              <p>
                Academia Next is not liable for indirect, incidental, or
                consequential damages arising from your use of the platform,
                including loss of data, profits, or access.
              </p>

              <h3 className="font-semibold text-base mt-3">7. Termination</h3>
              <p>
                We reserve the right to suspend or terminate accounts for
                violations of these Terms, repeated misuse, or illegal activity,
                without prior notice.
              </p>

              <h3 className="font-semibold text-base mt-3">
                8. Updates to Terms
              </h3>
              <p>
                We may modify these Terms at any time. Users will be notified of
                significant updates, and continued use of the platform indicates
                acceptance of the updated terms.
              </p>

              <h3 className="font-semibold text-base mt-3">9. Governing Law</h3>
              <p>
                These Terms are governed by the laws of the country in which
                Academia Next operates, without regard to conflict of law
                principles.
              </p>

              <p className="mt-4 text-sm italic text-neutral-500">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </DialogBox>
          </>
        ),
        type: "checkbox",
        required: true,
      },
      { name: "captcha", label: "Captcha", type: "captcha", required: true },
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
