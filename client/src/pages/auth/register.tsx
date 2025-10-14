import React, { useState } from "react";
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


type FormData = { [key: string]: any };

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

  const router = useRouter()

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

    for (const section of REGISTER_FORM_FIELDS) {
      for (const field of section.fields) {
        if (
          field.type === "checkbox" &&
          field.required &&
          !(formData[field.name as keyof RegisterPayload] as boolean)
        ) {
          showError(`Please accept the Terms & Conditions`);
          return;
        }
      }
    }

    try {
      const response = await registerMutation.mutateAsync(formData);
      const user = response.data;
      dispatch(setUser(user));
      if (user.accessToken) dispatch(setAccessToken(user.accessToken));
      showSuccess(response.message);

      // ✅ Reset all form fields
    const resetData = (
      Object.keys(formData) as (keyof RegisterPayload)[]
    ).reduce((acc, key) => {
      const value = formData[key];

      if (Array.isArray(value)) {
        acc[key] = [] as any; // roles or other arrays
      } else if (typeof value === "boolean") {
        acc[key] = false as any; // terms
      } else if (value instanceof File || value === null) {
        acc[key] = null as any; // profilePicture
      } else {
        acc[key] = "" as any; // strings
      }

      return acc;
    }, {} as RegisterPayload);

      setFormData(resetData);
      router.push(
        `/auth/confirm-email?email=${encodeURIComponent(formData.email)}`
      );
    } catch (error: any) {
      if (error.response?.data?.message) showError(error.response.data.message);
      else if (error.response?.data?.error)
        showError(error.response.data.error);
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
