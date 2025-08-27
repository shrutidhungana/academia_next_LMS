const API_BASE_AUTH = process.env.NEXT_PUBLIC_API_AUTH;

export const apiEndpoints = {
  register: `${API_BASE_AUTH}/auth/register`,
  confirmEmail: `${API_BASE_AUTH}/auth/confirm-email`,
  login: `${API_BASE_AUTH}/auth/login`,
  forgotPassword: `${API_BASE_AUTH}/auth/forgot-password`,
  resetPassword: `${API_BASE_AUTH}/auth/reset-password`,
  refreshToken: `${API_BASE_AUTH}/auth/refresh-token`,
  logout: `${API_BASE_AUTH}/auth/logout`,
  resendOtp: `${API_BASE_AUTH}/auth/resend-otp`,
  verifyAccessToken: `${API_BASE_AUTH}/auth/me`,
  auth: `${API_BASE_AUTH}/auth/check-auth`,
};
