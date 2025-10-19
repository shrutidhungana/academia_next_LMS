import React, { useState, useRef } from "react";
import AuthLayout from "@/components/auth/layout";
import CommonForm from "@/components/common/Forms";
import ContinueWithButtons from "@/components/auth/oauth";
import { REGISTER_FORM_FIELDS } from "@/config/form.config";
import { SOCIAL_PROVIDERS } from "@/config/oauth.config";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/useToast";
import useAuth from "@/hooks/authHooks/useAuth";
import { setUser, setAccessToken } from "@/store/auth-slice";
import { RegisterPayload } from "@/types";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";



const Register: React.FC = () => {

const defaultFormData: RegisterPayload = {
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  maritalStatus: "",
  dateOfBirth: "",
  profilePicture: null,
  country: "",
  state: "",
  city: "",
  zip: "",
  address1: "",
  address2: "",
  roles: [],
  organization: "",
  department: "",
  jobTitle: "",
  howDidYouHear: "",
  terms: false,
  captcha: "",
};


 const [formData, setFormData] = useState<RegisterPayload>(defaultFormData);
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const { registerMutation, uploadImageMutation } = useAuth();

  const router = useRouter();


  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleUpload = async (file: File) => {
    try {
      const response = await uploadImageMutation.mutateAsync(file);
      setFormData((prev) => ({ ...prev, profilePicture: response.url }));
      showSuccess("Profile picture uploaded successfully!");
    } catch (err: any) {
      showError(err.message || "Failed to upload profile picture");
    }
  };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // 1️⃣ Validate required checkboxes (e.g., Terms & Conditions)
  for (const section of REGISTER_FORM_FIELDS) {
    for (const field of section.fields) {
      if (
        field.type === "checkbox" &&
        field.required &&
        !(formData[field.name as keyof RegisterPayload] as boolean)
      ) {
        showError("Please accept the Terms & Conditions");
        return;
      }
    }
  }

  // 2️⃣ Validate captcha
  if (!formData.captcha) {
    showError("Please complete the captcha");
    return;
  }

  try {
    // 3️⃣ Prepare payload
    const payload: RegisterPayload & { captcha: string } = {
      ...formData,
      captcha: formData.captcha, // ensure captcha token is sent
    };

    // 4️⃣ Call register mutation
    const response = await registerMutation.mutateAsync(payload);

    // 5️⃣ Show success toast
    showSuccess(response.message);

    // 6️⃣ Dispatch user & access token if available
    const user = response.data;
    dispatch(setUser(user));
    if (user.accessToken) dispatch(setAccessToken(user.accessToken));

    // 7️⃣ Reset form fields
    const resetData = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof RegisterPayload];
      if (Array.isArray(value)) acc[key as keyof RegisterPayload] = [] as any;
      else if (typeof value === "boolean")
        acc[key as keyof RegisterPayload] = false as any;
      else if (value instanceof File || value === null)
        acc[key as keyof RegisterPayload] = null as any;
      else acc[key as keyof RegisterPayload] = "" as any;
      return acc;
    }, {} as RegisterPayload);

    setFormData(resetData);

    // 8️⃣ Reset captcha
    recaptchaRef.current?.reset();

    // 9️⃣ Navigate to confirm email page
    router.push(
      `/auth/confirm-email?email=${encodeURIComponent(payload.email)}`
    );
  } catch (error: any) {
    // 10️⃣ Handle errors
    if (error.response?.data?.message) showError(error.response.data.message);
    else if (error.response?.data?.error) showError(error.response.data.error);
    else showError(error.message || "Registration failed");
  }
};


  const handleProviderClick = (providerId: string) => {
    alert(`${providerId} login clicked`);
  };

  return (
    <AuthLayout title="Join Academia-Next" subtitle="Create your account now">
      <div className="w-full max-w-3xl space-y-6">
        <CommonForm
          formControls={REGISTER_FORM_FIELDS}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Register"
          onUpload={handleUpload}
          recaptchaRef={recaptchaRef}
        />

        <div className="mt-10 text-center text-sm text-muted-foreground">
          {" "}
          OR CONTINUE WITH{" "}
        </div>
        <ContinueWithButtons
          providers={SOCIAL_PROVIDERS.map((provider) => ({
            ...provider,
            onClick: () => handleProviderClick(provider.id),
          }))}
        />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
