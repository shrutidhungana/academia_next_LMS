import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import CommonForm from "@/components/common/Forms";
import ContinueWithButtons from "@/components/auth/oauth";
import { LOGIN_FORM_FIELDS} from "@/config/form.config";
import { SOCIAL_PROVIDERS } from "@/config/oauth.config";
import Link from "next/link";

type FormData = {
  [key: string]: unknown;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ roles: [] });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Add validation & API call
  };

  const handleProviderClick = (providerId: string) => {
    alert(`${providerId} login clicked`);
    // TODO: Trigger OAuth flow (NextAuth etc.)
  };

  return (
    <AuthLayout title="Welcome to Academia-Next" subtitle="Login to  your account now">
      <div className="w-full max-w-3xl space-y-6">
        {/* Registration form */}
        <CommonForm
          formControls={LOGIN_FORM_FIELDS}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Login"
          
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
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;