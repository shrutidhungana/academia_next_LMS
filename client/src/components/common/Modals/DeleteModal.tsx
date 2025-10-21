"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  question: string;
  additionalText?: string;
  onConfirm: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  title = "Delete item?",
  question,
  additionalText,
  onConfirm,
  confirmText = "Delete",
  onCancel,
  cancelText = "Cancel",
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-red-100/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { type: "spring", damping: 18 },
            }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="relative bg-[#F7F2F9] rounded-xl shadow-2xl border border-red-100 w-full max-w-md p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition"
              >
                <IoClose size={22} />
              </button>

              {/* Header */}
              <div className="flex items-center mb-4">
                <FaTrashAlt className="text-red-600 text-2xl mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-red-800">
                  {title}
                </h2>
              </div>

              {/* Body */}
              <div className="text-sm sm:text-base">
                <p className="text-red-700 mb-2">{question}</p>
                {additionalText && (
                  <p className="text-gray-500">{additionalText}</p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-red-200 my-4" />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  onClick={onConfirm}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition"
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

export default DeleteModal;
