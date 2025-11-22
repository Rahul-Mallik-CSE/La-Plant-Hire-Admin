/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get access token from localStorage (client-side only)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        console.log(
          "🔍 Token from localStorage:",
          token ? `${token.substring(0, 30)}...` : "NULL"
        );

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          console.log("✅ Authorization header set");
        } else {
          console.error("❌ No token in localStorage - Please log in again");
        }

        // Debug: Show all headers being sent
        console.log("📤 Request headers:", {
          Authorization: headers.get("Authorization"),
          ContentType: headers.get("Content-Type"),
        });
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["User", "Enquiry"],
  endpoints: () => ({}),
});

export default baseApi;
