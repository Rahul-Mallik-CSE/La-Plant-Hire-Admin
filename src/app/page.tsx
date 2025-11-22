/** @format */

"use client";

import CommonTable from "@/components/CommonComponents/CommonTable";
import { useGetEnquiriesQuery } from "@/redux/features/enquiriesAPI";
import { useMemo } from "react";

export default function Home() {
  const { data, isLoading, error } = useGetEnquiriesQuery(1);

  // Filter only pending enquiries
  const pendingEnquiries = useMemo(
    () => data?.data?.filter((enquiry) => enquiry.status === "pending") || [],
    [data]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen font-sans py-6 px-4 md:px-8">
        <div className="w-full space-y-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Enquiries
          </h1>
          <div className="text-center py-8 text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen font-sans py-6 px-4 md:px-8">
        <div className="w-full space-y-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Enquiries
          </h1>
          <div className="text-center py-8 text-red-500">
            Error loading enquiries. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans py-6 px-4 md:px-8">
      <div className="w-full space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Enquiries ({pendingEnquiries.length})
        </h1>
        <CommonTable data={pendingEnquiries} rowsPerPage={15} />
      </div>
    </div>
  );
}
