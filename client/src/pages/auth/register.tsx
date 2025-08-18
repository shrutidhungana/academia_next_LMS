import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import CommonForm from "@/components/common/Forms";
import ContinueWithButtons from "@/components/auth/oauth";
import { REGISTER_FORM_FIELDS } from "@/config/form.config";
import { SOCIAL_PROVIDERS } from "@/config/oauth.config";
import Link from "next/link";
import { useRegister } from "@/hooks/authHooks/useRegister";
import { useDispatch } from "react-redux";
import { setRegisterData, setSubmitting } from "@/store/auth-slice";
import {useToast } from "@/hooks/useToast";

type FormData = {
  [key: string]: unknown;
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ roles: [] });
 const dispatch = useDispatch();
 
 const { showSuccess, showError } = useToast();
 const { mutate, isPending } = useRegister();

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   dispatch(setSubmitting(true));
   dispatch(setRegisterData(formData as any));

   mutate(formData as any, {
     onSuccess: (res: any) => {
       // Backend sends { status, message, data }
       showSuccess(res.message || "Registration successful!");
     },
     onError: (err: any) => {
       // If backend sends error message in response
       const message =
         err?.response?.data?.message || "Registration failed. Try again.";
       showError(message);
     },
     onSettled: () => {
       dispatch(setSubmitting(false));
     },
   });
 };
  const handleProviderClick = (providerId: string) => {
    alert(`${providerId} login clicked`);
    // TODO: Trigger OAuth flow (NextAuth etc.)
  };

  return (
    <AuthLayout title="Join Academia-Next" subtitle="Create your account now">
      <div className="w-full max-w-3xl space-y-6">
        {/* Registration form */}
        <CommonForm
          formControls={REGISTER_FORM_FIELDS}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Register"
        />

        {/* Divider text */}
        <div className="mt-10 text-center text-sm text-muted-foreground">
          OR CONTINUE WITH
        </div>

        {/* Social login buttons */}
        <ContinueWithButtons
          providers={SOCIAL_PROVIDERS.map((provider) => ({
            ...provider,
            onClick: () => handleProviderClick(provider.id),
          }))}
        />

        {/* Login link */}
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
