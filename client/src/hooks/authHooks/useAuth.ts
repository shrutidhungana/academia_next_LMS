import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "@/utils/authUser";
import {
  RegisterPayload,
  LoginPayload,
  ConfirmEmailPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  ResendOtpPayload,
  UserResponse,
} from "@/types";

const {
  register,
  confirmEmail,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  resendOtp,
  verifyAccessToken,
  auth,
  upload,
} = apiEndpoints;

const useAuth = () => {
  const queryClient = useQueryClient();

  const getAccessToken = () => {
    if (typeof window !== "undefined")
      return localStorage.getItem("accessToken");
    return null;
  };

  const authUserQuery = useQuery<UserResponse, Error>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) throw new Error("No access token");

      const res = await axios.get<UserResponse>(verifyAccessToken, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!getAccessToken(),
  });

  const checkAuthQuery = useQuery<{ authenticated: boolean }, Error>({
    queryKey: ["checkAuth"],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) return { authenticated: false };

      const res = await axios.get<{ authenticated: boolean }>(auth, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!getAccessToken(),
  });

  // ---------------- Mutations ----------------
  const registerMutation = useMutation<
    { status: number; message: string; data: UserResponse },
    Error,
    RegisterPayload
  >({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await axios.post(register, payload);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const confirmEmailMutation = useMutation<
    UserResponse,
    Error,
    ConfirmEmailPayload
  >({
    mutationFn: async (payload: ConfirmEmailPayload) => {
      const res = await axios.post<UserResponse>(confirmEmail, payload);
      return res.data;
    },
  });

  const loginMutation = useMutation<UserResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const res = await axios.post<UserResponse>(login, payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const forgotPasswordMutation = useMutation<
    { message: string },
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const res = await axios.post<{ message: string }>(
        forgotPassword,
        payload
      );
      return res.data;
    },
  });

  const resetPasswordMutation = useMutation<
    { message: string },
    Error,
    ResetPasswordPayload
  >({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const res = await axios.post<{ message: string }>(resetPassword, payload);
      return res.data;
    },
  });

  const refreshTokenMutation = useMutation<UserResponse, Error>({
    mutationFn: async () => {
      const res = await axios.post<UserResponse>(
        refreshToken,
        {},
        { withCredentials: true }
      );
      return res.data;
    },
  });

  const logoutMutation = useMutation<{ message: string }, Error>({
    mutationFn: async () => {
      const res = await axios.post<{ message: string }>(
        logout,
        {},
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => queryClient.removeQueries({ queryKey: ["authUser"] }),
  });

  const resendOtpMutation = useMutation<
    { message: string },
    Error,
    ResendOtpPayload
  >({
    mutationFn: async (payload: ResendOtpPayload) => {
      const res = await axios.post<{ message: string }>(resendOtp, payload);
      return res.data;
    },
  });

  const uploadImageMutation = useMutation<{ url: string }, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post<{ url: string }>(upload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
  });

  return {
    authUserQuery,
    checkAuthQuery,
    registerMutation,
    confirmEmailMutation,
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    refreshTokenMutation,
    logoutMutation,
    resendOtpMutation,
    uploadImageMutation,
  };
};

export default useAuth;
