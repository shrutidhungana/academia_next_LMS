"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline, IoClose } from "react-icons/io5";

interface WarningModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  question: string;
  additionalText?: string;
  onConfirm: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
}

const WarningModal: React.FC<WarningModalProps> = ({
  open,
  onClose,
  title = "Are you sure?",
  question,
  additionalText,
  onConfirm,
  confirmText = "Confirm",
  onCancel,
  cancelText = "Cancel",
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-yellow-100/30 backdrop-blur-[2px] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="bg-[#FFFBEB] rounded-xl p-6 shadow-xl max-w-md w-full relative border border-yellow-200">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-yellow-700 hover:text-yellow-900 transition"
                aria-label="Close modal"
              >
                <IoClose size={22} />
              </button>

              {/* Header */}
              <div className="flex items-center mb-3">
                <div className="text-yellow-500 mr-3">
                  <IoWarningOutline size={28} />
                </div>
                <h2 className="text-xl font-semibold text-yellow-800 leading-tight">
                  {title}
                </h2>
              </div>

              {/* Body */}
              <div className="space-y-2 mb-4">
                <p className="text-yellow-900 text-sm sm:text-base">
                  {question}
                </p>
                {additionalText && (
                  <p className="text-yellow-700 text-sm">{additionalText}</p>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4 border-t border-yellow-200">
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition font-medium"
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  onClick={onConfirm}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition font-medium"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WarningModal;
