/** @format */

"use client";

import React, { useState } from "react";
import { Enquiry } from "@/types/AllTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { CgLayoutList } from "react-icons/cg";
import EnquiryModal from "./EnquiryModal";
import { useUpdateEnquiryStatusMutation } from "@/redux/features/enquiriesAPI";
import { useUpdateConfirmedOrderStatusMutation } from "@/redux/features/confirmedOrdersAPI";
import { useDeleteCancelledOrderMutation } from "@/redux/features/cancelledOrdersAPI";
import { useDeleteCompletedOrderMutation } from "@/redux/features/completedOrdersAPI";
import { toast } from "sonner";

interface CommonTableProps {
  data: Enquiry[];
  // server-driven pagination: parent manages page
  currentPage?: number;
  onPageChange?: (page: number) => void;
  isConfirmedOrdersPage?: boolean;
  isCancelledOrdersPage?: boolean;
  isCompletedOrdersPage?: boolean;
}

const CommonTable: React.FC<CommonTableProps> = ({
  data,
  currentPage = 1,
  onPageChange,
  isConfirmedOrdersPage = false,
  isCancelledOrdersPage = false,
  isCompletedOrdersPage = false,
}) => {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateEnquiryStatus] = useUpdateEnquiryStatusMutation();
  const [updateConfirmedOrderStatus] = useUpdateConfirmedOrderStatusMutation();
  const [deleteCancelledOrder] = useDeleteCancelledOrderMutation();
  const [deleteCompletedOrder] = useDeleteCompletedOrderMutation();

  // For server-side pagination we render returned data as-is
  const currentData = data || [];

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle page change (delegated to parent)
  const handlePageChange = (page: number) => {
    const next = Math.max(1, Math.floor(page));
    if (!onPageChange) return;
    // avoid redundant calls
    if (next === currentPage) return;
    onPageChange(next);
  };

  // server-side pagination only supports Prev/Next and page indicator

  // Handle view button click
  const handleViewClick = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  // Handle confirm order (or complete order on confirmed orders page)
  const handleConfirmOrder = async (enquiry: Enquiry) => {
    try {
      if (isConfirmedOrdersPage) {
        // Complete order on confirmed orders page
        await updateConfirmedOrderStatus({
          id: enquiry.id,
          status: "completed",
        }).unwrap();
        toast.success("Order completed successfully");
      } else {
        // Approve enquiry on enquiries page
        await updateEnquiryStatus({
          id: enquiry.id,
          status: "approved",
        }).unwrap();
        toast.success("Enquiry approved successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update order");
    }
  };

  // Handle cancel order
  const handleCancelOrder = async (enquiry: Enquiry) => {
    try {
      if (isConfirmedOrdersPage) {
        // Reject confirmed order
        await updateConfirmedOrderStatus({
          id: enquiry.id,
          status: "rejected",
        }).unwrap();
        toast.success("Order cancelled successfully");
      } else {
        // Reject enquiry
        await updateEnquiryStatus({
          id: enquiry.id,
          status: "rejected",
        }).unwrap();
        toast.success("Enquiry rejected successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to reject order:", error);
      toast.error("Failed to reject order");
    }
  };

  // Handle delete order (for cancelled and completed orders page)
  const handleDeleteOrder = async (enquiry: Enquiry) => {
    try {
      if (isCancelledOrdersPage) {
        await deleteCancelledOrder(enquiry.id).unwrap();
      } else if (isCompletedOrdersPage) {
        await deleteCompletedOrder(enquiry.id).unwrap();
      }
      toast.success("Order deleted successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-white ">
        <Table className="border-none">
          <TableHeader></TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-gray-500"
                >
                  No enquiries found
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((enquiry) => (
                <TableRow
                  key={enquiry.id}
                  className="hover:bg-gray-50 transition-colors border-b  "
                >
                  {/* Name with Avatar */}
                  <TableCell>
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black font-medium text-sm">
                        {getInitials(enquiry.contact_name)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {enquiry.contact_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {enquiry.service
                            ? `Equipment: ${enquiry.service.name}`
                            : enquiry.is_soild_request
                            ? "Soil Request"
                            : "Fill Request"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs font-medium bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleViewClick(enquiry)}
                      >
                        VIEW
                      </Button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="More options"
                      >
                        <CgLayoutList className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Server-side Pagination controls (Prev / Page X / Next) */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange((currentPage || 1) - 1)}
          disabled={(currentPage || 1) <= 1 || !onPageChange}
        >
          Prev
        </Button>
        <div className="text-sm text-gray-600">Page {currentPage}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange((currentPage || 1) + 1)}
          disabled={!onPageChange || currentData.length === 0}
        >
          Next
        </Button>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        enquiry={selectedEnquiry}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
        onCancel={handleCancelOrder}
        onDelete={handleDeleteOrder}
        isConfirmedOrdersPage={isConfirmedOrdersPage}
        isCancelledOrdersPage={isCancelledOrdersPage}
        isCompletedOrdersPage={isCompletedOrdersPage}
      />
    </div>
  );
};

export default CommonTable;
