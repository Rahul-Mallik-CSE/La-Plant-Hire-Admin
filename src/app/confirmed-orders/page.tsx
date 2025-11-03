/** @format */

"use client";

import CommonTable from "@/components/CommonComponents/CommonTable";
import { enquiriesData } from "@/data/AllData";
import { Enquiry } from "@/types/AllTypes";
import { useState, useMemo } from "react";

const ConfirmedOrders = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(enquiriesData);

  // Filter only accepted enquiries
  const acceptedEnquiries = useMemo(
    () => enquiries.filter((enquiry) => enquiry.status === "accepted"),
    [enquiries]
  );

  // Handle status change
  const handleStatusChange = (updatedEnquiry: Enquiry) => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === updatedEnquiry.id ? updatedEnquiry : enq))
    );
  };

  return (
    <div className="flex min-h-screen font-sans py-6 px-4 md:px-8">
      <div className="w-full space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Confirmed Orders ({acceptedEnquiries.length})
        </h1>
        <CommonTable
          data={acceptedEnquiries}
          rowsPerPage={15}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default ConfirmedOrders;
