"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ReactNode, useState } from "react";

type DialogBoxProps = {
  title?: string;
  description?: string;
  trigger: ReactNode;
  children: ReactNode;
};

const DialogBox = ({
  title,
  description,
  trigger,
  children,
}: DialogBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />

        {/* Dialog Content */}
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 
          rounded-3xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md 
          border border-white/20 shadow-2xl p-6 focus:outline-none 
          data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            {title && (
              <Dialog.Title className="text-xl font-bold text-neutral-900 dark:text-white">
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Description */}
          {description && (
            <Dialog.Description className="text-sm text-neutral-500 mb-4">
              {description}
            </Dialog.Description>
          )}

          {/* Content (scrollable but no scrollbar visible) */}
          <div className="overflow-y-auto max-h-[70vh] pr-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4 no-scrollbar">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      {/* Animations + Hide Scrollbar */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.95);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-in;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        .animate-scaleOut {
          animation: scaleOut 0.25s ease-in;
        }

        /* Hide scrollbar but keep scrollability */
        .no-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </Dialog.Root>
  );
};

export default DialogBox;
