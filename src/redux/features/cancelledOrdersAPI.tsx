/** @format */

import { baseApi } from "../api/baseAPI";
import type { EnquiriesResponse } from "@/types/AllTypes";

export const cancelledOrdersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCancelledOrders: builder.query<EnquiriesResponse, number>({
      query: (page = 1) => ({
        url: `/managements/enquiries/?page=${page}&status=rejected`,
        method: "GET",
      }),
      providesTags: ["Enquiry"],
    }),

    deleteCancelledOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/managements/enquiries/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
});

export const { useGetCancelledOrdersQuery, useDeleteCancelledOrderMutation } =
  cancelledOrdersAPI;
