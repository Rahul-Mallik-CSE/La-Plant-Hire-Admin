/** @format */

import { baseApi } from "../api/baseAPI";

interface LoginRequest {
  username: string;
  password: string | number;
}

interface LoginResponse {
  refresh: string;
  access: string;
}

interface ForgetPasswordRequest {
  username: string;
}

interface ForgetPasswordResponse {
  message: string;
  varify_url: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: number;
}

interface VerifyOtpResponse {
  refresh: string;
  access: string;
}

interface ResetPasswordRequest {
  new_password: string;
}

interface ResetPasswordResponse {
  message: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    forgetPassword: builder.mutation<
      ForgetPasswordResponse,
      ForgetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgetpassword/",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: ({ email, otp }) => ({
        url: `/auth/vefiry_for_forget/${email}/`,
        method: "POST",
        body: { otp },
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => {
        const accessToken = sessionStorage.getItem("reset_access_token");
        return {
          url: "/auth/reset_password/",
          method: "POST",
          body: data,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
