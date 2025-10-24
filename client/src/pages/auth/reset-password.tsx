"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import CommonForm from "@/components/common/Forms";
import { RESET_PASSWORD_FORM_FIELDS } from "@/config/form.config";
import useAuth from "@/hooks/authHooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const { resetPasswordMutation } = useAuth();
  const { otp, forgotPasswordEmail } = useSelector(
      (state: RootState) => state.auth
  );
    
    const { showError, showSuccess } = useToast();
    const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        email: forgotPasswordEmail!,
        otp: otp!,
        newPassword: formData.password,
      });
        showSuccess("Password reset successful! You can now login.");
        router.push("/auth/login")
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password">
      <CommonForm
        formControls={RESET_PASSWORD_FORM_FIELDS}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText="Reset Password"
      />
    </AuthLayout>
  );
};

export default ResetPassword;
