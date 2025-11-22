/** @format */

"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Enquiry } from "@/types/AllTypes";
import { Button } from "@/components/ui/button";

interface EnquiryModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (enquiry: Enquiry) => void;
  onCancel?: (enquiry: Enquiry) => void;
  onDelete?: (enquiry: Enquiry) => void;
  isConfirmedOrdersPage?: boolean;
  isCancelledOrdersPage?: boolean;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({
  enquiry,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  onDelete,
  isConfirmedOrdersPage = false,
  isCancelledOrdersPage = false,
}) => {
  if (!enquiry) return null;

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0">
          <DialogTitle className="text-lg font-semibold">
            Client Enquiry
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Client Info */}
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-black font-medium text-base shrink-0">
              {getInitials(enquiry.contact_name)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base text-gray-900">
                {enquiry.contact_name}
              </h3>
              <p className="text-sm text-gray-600">{enquiry.contact_phone}</p>
              <p className="text-sm text-gray-600">{enquiry.contact_email}</p>
            </div>
          </div>

          {/* Service/Equipment Section */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Service/equipment</p>
                <p className="font-medium text-gray-900">
                  {enquiry.service
                    ? enquiry.service.name
                    : enquiry.is_soild_request
                    ? "Soil Request"
                    : "Fill Request"}
                </p>
              </div>
            </div>
          </div>

          {/* Duration */}
          {enquiry.servie_duration_days && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="font-medium text-gray-900">
                {enquiry.servie_duration_days} days
              </p>
            </div>
          )}

          {/* Description */}
          {enquiry.project_discription && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Description</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {enquiry.project_discription}
              </p>
            </div>
          )}

          {/* Additional Fields for Soil/Fill Requests */}
          {(enquiry.volume || enquiry.fill_type_wanted) && (
            <div className="space-y-2">
              {enquiry.volume && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Volume</p>
                  <p className="font-medium text-gray-900">{enquiry.volume}</p>
                </div>
              )}
              {enquiry.fill_type_wanted && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fill Type</p>
                  <p className="font-medium text-gray-900">
                    {enquiry.fill_type_wanted}
                  </p>
                </div>
              )}
              {enquiry.suburb && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Suburb</p>
                  <p className="font-medium text-gray-900">{enquiry.suburb}</p>
                </div>
              )}
              {enquiry.street_address && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Street Address</p>
                  <p className="font-medium text-gray-900">
                    {enquiry.street_address}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons based on status */}
          <div className="flex gap-3 pt-2">
            {enquiry.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => onCancel?.(enquiry)}
                >
                  CANCEL ORDER
                </Button>
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => onConfirm?.(enquiry)}
                >
                  CONFIRM ORDER
                </Button>
              </>
            )}

            {enquiry.status === "approved" && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => onCancel?.(enquiry)}
                >
                  CANCEL ORDER
                </Button>
                {isConfirmedOrdersPage ? (
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => onConfirm?.(enquiry)}
                  >
                    COMPLETED
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
                    onClick={onClose}
                  >
                    GO BACK
                  </Button>
                )}
              </>
            )}

            {(enquiry.status === "rejected" ||
              enquiry.status === "completed") && (
              <>
                {isCancelledOrdersPage && enquiry.status === "rejected" ? (
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => onDelete?.(enquiry)}
                  >
                    DELETE
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                    onClick={onClose}
                  >
                    GO BACK
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryModal;
