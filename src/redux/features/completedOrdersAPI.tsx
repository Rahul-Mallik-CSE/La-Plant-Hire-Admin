/** @format */

import { baseApi } from "../api/baseAPI";
import type { EnquiriesResponse } from "@/types/AllTypes";

export const completedOrdersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedOrders: builder.query<EnquiriesResponse, number>({
      query: (page = 1) => ({
        url: `/managements/enquiries/?page=${page}&status=completed`,
        method: "GET",
      }),
      providesTags: ["Enquiry"],
    }),

    deleteCompletedOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/managements/enquiries/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const { useGetCompletedOrdersQuery, useDeleteCompletedOrderMutation } =
  completedOrdersAPI;
