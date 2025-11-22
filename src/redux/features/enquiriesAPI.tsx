/** @format */

import { baseApi } from "../api/baseAPI";
import type { Enquiry, EnquiriesResponse } from "@/types/AllTypes";

export const enquiriesAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnquiries: builder.query<EnquiriesResponse, number>({
      query: (page = 1) => ({
        url: `/managements/enquiries/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Enquiry"],
    }),

    updateEnquiryStatus: builder.mutation<
      Enquiry,
      { id: number; status: "approved" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/managements/enquiries/${id}/`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const { useGetEnquiriesQuery, useUpdateEnquiryStatusMutation } =
  enquiriesAPI;
