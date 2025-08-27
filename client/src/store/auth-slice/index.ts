// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User info (from register/login/me)
interface User {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  email?: string;
  gender?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  profilePicture?: string | null;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  address1?: string;
  address2?: string;
  roles?: string[];
  organization?: string;
  department?: string;
  jobTitle?: string;
  howDidYouHear?: string;
}

// Auth slice state
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isSubmitting: boolean;
  error: string | null;
  otp?: string | null; // for confirm email / reset password
  emailForOtp?: string | null; // email associated with OTP
  forgotPasswordEmail?: string | null; // email for forgot password flow
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isSubmitting: false,
  error: null,
  otp: null,
  emailForOtp: null,
  forgotPasswordEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set current user after login/register/me
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    // Set access token after login/refresh
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    // Loading/submitting state
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    // Error messages from backend
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // OTP handling (confirm email / reset password / resend OTP)
    setOtp: (state, action: PayloadAction<string | null>) => {
      state.otp = action.payload;
    },
    setEmailForOtp: (state, action: PayloadAction<string | null>) => {
      state.emailForOtp = action.payload;
    },
    // Forgot password flow email
    setForgotPasswordEmail: (state, action: PayloadAction<string | null>) => {
      state.forgotPasswordEmail = action.payload;
    },
    // Clear all auth state (logout)
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isSubmitting = false;
      state.error = null;
      state.otp = null;
      state.emailForOtp = null;
      state.forgotPasswordEmail = null;
    },
  },
});

export const {
  setUser,
  setAccessToken,
  setIsSubmitting,
  setError,
  setOtp,
  setEmailForOtp,
  setForgotPasswordEmail,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
