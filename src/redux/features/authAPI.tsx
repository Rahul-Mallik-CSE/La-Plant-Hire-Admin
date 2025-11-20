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

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
