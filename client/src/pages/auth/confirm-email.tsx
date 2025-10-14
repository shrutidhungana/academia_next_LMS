"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/layout";
import OTPInput from "@/components/auth/OTPInput";
import { useToast } from "@/hooks/useToast";
import useAuth from "@/hooks/authHooks/useAuth";

const ConfirmEmailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { confirmEmailMutation, resendOtpMutation } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false); // <-- added

  useEffect(() => {
    if (!email) {
      showError("Invalid or missing email");
      router.push("/auth/register");
    }
  }, [email, router, showError]);

  const handleConfirmEmail = async (otp: string) => {
    setIsSubmitting(true); // <-- start submitting
    try {
      const response = await confirmEmailMutation.mutateAsync({ email, otp });
      const apiMessage =
        response?.message ||
        response?.data?.message ||
        "Email confirmed successfully!";
      showSuccess(apiMessage);
      router.push("/auth/login");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to confirm email";
      showError(errorMessage);
    } finally {
      setIsSubmitting(false); // <-- done submitting
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await resendOtpMutation.mutateAsync({ email });
      showSuccess(res?.message || "OTP resent successfully!");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to resend OTP";
      showError(errorMessage);
    }
  };

  return (
    <AuthLayout
      title="Confirm Your Email"
      subtitle="Enter the OTP sent to your inbox"
    >
      <OTPInput
        email={email}
        onSubmit={handleConfirmEmail}
        onResend={handleResendOtp}
        buttonText1="Confirm Email"
        buttonText2="Resend OTP"
        title="OTP expired. You can resend it."
        timerSeconds={120}
        otpLength={6}
        isSubmitting={isSubmitting} // <-- pass here
      />
    </AuthLayout>
  );
};

export default ConfirmEmailPage;
