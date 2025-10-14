"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@radix-ui/themes";
import clsx from "clsx";
import { AiOutlineMail } from "react-icons/ai";

type OTPInputProps = {
  email: string;
  title?: string;
  subtitle?: string;
  buttonText1?: string; // e.g., "Confirm Email"
  buttonText2?: string; // e.g., "Resend OTP"
  onSubmit: (otp: string) => void;
  onResend?: () => void;
  isSubmitting?: boolean;
  otpLength?: number;
  timerSeconds?: number; // countdown duration in seconds
  
};

const OTPInput: React.FC<OTPInputProps> = ({
  email,
  

  buttonText1 = "Confirm Email",
  buttonText2 = "Resend OTP",
  onSubmit,
  onResend,
  isSubmitting,
  otpLength = 6,
  timerSeconds = 120,
  title = "OTP expired. You can resend it.",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [expired, setExpired] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value.replace(/\D/g, ""); // only numbers
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val[0];
    setOtp(newOtp);

    // focus next input
    if (index < otpLength - 1 && val[0]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const prevOtp = [...otp];
        prevOtp[index - 1] = "";
        setOtp(prevOtp);
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(otp.join(""));
  };

  const handleResend = () => {
    setOtp(Array(otpLength).fill(""));
    setTimeLeft(timerSeconds);
    setExpired(false);
    if (onResend) onResend();
    inputRefs.current[0]?.focus();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900">
      <div className="mb-6 text-center">
        
       
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <AiOutlineMail size={20} />
          <span>OTP sent to {email}</span>
        </div>
      </div>

      {!expired ? (
        <>
          <div className="flex justify-between gap-2 mb-4">
            {Array.from({ length: otpLength }).map((_, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={otp[idx]}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            ))}
          </div>

          <div className="text-center text-sm mb-4 text-gray-600 dark:text-gray-300">
            Time left: {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>

          <Button
            disabled={isSubmitting || otp.some((o) => !o)}
            className={clsx(
              "w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            )}
            onClick={handleSubmit}
          >
            {buttonText1}
          </Button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {title}
          </p>
          <Button
            className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            onClick={handleResend}
          >
            {buttonText2}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OTPInput;
