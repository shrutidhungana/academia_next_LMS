import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import CommonForm from "@/components/common/Forms";
import ContinueWithButtons from "@/components/auth/oauth";
import { LOGIN_FORM_FIELDS} from "@/config/form.config";
import { SOCIAL_PROVIDERS } from "@/config/oauth.config";
import Link from "next/link";
import useAuth from "@/hooks/authHooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "@/store/auth-slice";
import { useRouter } from "next/router";

type FormData = {
  [key: string]: unknown;

};

const roleRedirectMap: Record<string, string> = {
  SuperAdmin: "/super-admin/dashboard",
  Admin: "/admin/dashboard",
  TenantAdmin: "/tenant/dashboard",
  Instructor: "/instructor/dashboard",
  Student: "/student/dashboard",
};

const Login: React.FC = () => {
   const [formData, setFormData] = useState<FormData>({
     email: "",
     password: "",
   });
   const { loginMutation } = useAuth();
   const { showError, showSuccess } = useToast();
   const dispatch = useDispatch();
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await loginMutation.mutateAsync({
      email: formData.email as string,
      password: formData.password as string,
    });

    if (res?.accessToken) {
      // Store in Redux
      dispatch(setUser(res));
      dispatch(setAccessToken(res.accessToken));

      // Store in localStorage
      localStorage.setItem("accessToken", res.accessToken);

      showSuccess("Login successful!");

      // --- Redirect based on role ---
      const role = res.roles?.[0];
      if (role && roleRedirectMap[role]) {
        router.push(roleRedirectMap[role]);
        return;
      }

      // Fallback
      router.push("/");
    }
  } catch (err: any) {
    showError(err.response?.data?.message || "Login failed");
  }
};

  const handleProviderClick = (providerId: string) => {
    alert(`${providerId} login clicked`);
    // TODO: Trigger OAuth flow (NextAuth etc.)
  };

  return (
    <AuthLayout
      title="Welcome to Academia-Next"
      subtitle="Login to  your account now"
    >
      <div className="w-full max-w-3xl space-y-6">
        {/* Registration form */}
        <CommonForm
          formControls={LOGIN_FORM_FIELDS}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Login"
        />
        <p className="text-sm text-right mt-1">
          <Link
            href="/auth/forget-password"
            className="text-indigo-600 hover:underline"
          >
            Forgot your password?
          </Link>
        </p>
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