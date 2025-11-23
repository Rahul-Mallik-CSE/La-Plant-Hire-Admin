/** @format */

"use client";

import CommonTable from "@/components/CommonComponents/CommonTable";
import { useGetCompletedOrdersQuery } from "@/redux/features/completedOrdersAPI";
import { useState } from "react";

const CompletedOrders = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetCompletedOrdersQuery(page);

  const completedOrders = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen font-sans py-6 px-4 md:px-8">
        <div className="w-full space-y-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Completed Orders
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
            Completed Orders
          </h1>
          <div className="text-center py-8 text-red-500">
            Error loading completed orders. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans py-6 px-4 md:px-8">
      <div className="w-full space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Completed Orders
        </h1>
        <CommonTable
          data={completedOrders}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
          isCompletedOrdersPage={true}
        />
      </div>
    </div>
  );
};

export default CompletedOrders;
