/** @format */

"use client";

import CommonTable from "@/components/CommonComponents/CommonTable";
import { enquiriesData } from "@/data/AllData";
import { useMemo } from "react";

const CancelledOrders = () => {
  // Filter only rejected enquiries
  const rejectedEnquiries = useMemo(
    () => enquiriesData.filter((enquiry) => enquiry.status === "rejected"),
    []
  );

  return (
    <div className="flex min-h-screen font-sans py-6 px-4 md:px-8">
      <div className="w-full space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Cancelled Orders ({rejectedEnquiries.length})
        </h1>
        <CommonTable data={rejectedEnquiries} rowsPerPage={15} />
      </div>
    </div>
  );
};

export default CancelledOrders;
