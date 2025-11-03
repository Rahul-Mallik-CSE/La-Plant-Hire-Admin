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
import { MoreVertical } from "lucide-react";

interface EnquiryModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (enquiry: Enquiry) => void;
  onCancel?: (enquiry: Enquiry) => void;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({
  enquiry,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
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
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-black font-medium text-base shrink-0">
              {getInitials(enquiry.name)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base text-gray-900">
                {enquiry.name}
              </h3>
              <p className="text-sm text-gray-600">{enquiry.phone}</p>
              <p className="text-sm text-gray-600">{enquiry.email}</p>
            </div>
          </div>

          {/* Service/Equipment Section */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Service/equipment</p>
                <p className="font-medium text-gray-900">{enquiry.equipment}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Price</p>
                <p className="font-semibold text-gray-900">$280/day</p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Duration</p>
            <p className="font-medium text-gray-900">{enquiry.duration}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {enquiry.description}
            </p>
          </div>

          {/* Three-dot menu at bottom */}
          <div className="flex justify-end">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>

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

            {enquiry.status === "accepted" && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => onCancel?.(enquiry)}
                >
                  CANCEL ORDER
                </Button>
                <Button
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
                  onClick={onClose}
                >
                  GO BACK
                </Button>
              </>
            )}

            {enquiry.status === "rejected" && (
              <Button
                className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                onClick={onClose}
              >
                GO BACK
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryModal;
