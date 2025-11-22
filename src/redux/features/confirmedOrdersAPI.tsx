/** @format */

import { baseApi } from "../api/baseAPI";
import type { Enquiry, EnquiriesResponse } from "@/types/AllTypes";

export const confirmedOrdersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfirmedOrders: builder.query<EnquiriesResponse, number>({
      query: (page = 1) => ({
        url: `/managements/enquiries/?page=${page}&status=approved`,
        method: "GET",
      }),
      providesTags: ["Enquiry"],
    }),

    updateConfirmedOrderStatus: builder.mutation<
      Enquiry,
      { id: number; status: "completed" | "rejected" }
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

export const {
  useGetConfirmedOrdersQuery,
  useUpdateConfirmedOrderStatusMutation,
} = confirmedOrdersAPI;
