"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import CommonForm from "@/components/common/Forms";
import { FORGOT_PASSWORD_FORM_FIELDS } from "@/config/form.config";
import { useRouter } from "next/router";
import useAuth from "@/hooks/authHooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useDispatch } from "react-redux";
import { setForgotPasswordEmail, setOtp } from "@/store/auth-slice";
import OTPInput from "@/components/auth/OTPInput";

type FormData = {
  [key: string]: string;
};

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const { forgotPasswordMutation, resendOtpMutation } = useAuth();
  const { showError, showSuccess } = useToast();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgotPasswordMutation.mutateAsync({ email: formData.email });
      dispatch(setForgotPasswordEmail(formData.email));
      setOtpSent(true);
      showSuccess("OTP sent to your email!");
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpSubmit = (otp: string) => {
    dispatch(setOtp(otp));
    showSuccess("OTP confirmed! You can now reset your password.");
     router.push("/auth/reset-password")
  };

  const handleResend = async () => {
    try {
      await resendOtpMutation.mutateAsync({ email: formData.email });
      showSuccess("OTP resent successfully!");
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset password"
    >
      {!otpSent ? (
        <CommonForm
          formControls={FORGOT_PASSWORD_FORM_FIELDS}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Send OTP"
        />
      ) : (
        <OTPInput
          email={formData.email}
          onSubmit={handleOtpSubmit}
          onResend={handleResend}
        />
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
