"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";

export type FileInputProps = {
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  onUpload?: (file: File) => void; // NEW
  multiple?: boolean;
  accept?: string;
  variant?: "avatar" | "dropzone";
  label?: string;
};

const FileInput: React.FC<FileInputProps> = ({
  value,
  onChange,
  onUpload,
  multiple = false,
  accept,
  variant = "dropzone",
  label,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (variant === "avatar" && value && value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value, variant]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    if (multiple) {
      const arr = Array.from(files);
      onChange(arr);
      if (onUpload) arr.forEach(onUpload);
    } else {
      const file = files[0];
      onChange(file);
      if (onUpload) onUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => inputRef.current?.click();

  if (variant === "avatar") {
    return (
      <div className="flex flex-col items-center">
        <div
          className="relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200"
          onClick={handleClick}
        >
          {preview ? (
            <Image
              src={preview}
              alt="Profile"
              className="h-full w-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <PlusIcon className="h-8 w-8" />
            </div>
          )}
        </div>
        <input
          type="file"
          accept={accept}
          className="hidden"
          ref={inputRef}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    );
  }

  // Dropzone
  return (
    <div
      className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-400 bg-gray-50 text-center text-gray-600 hover:bg-gray-100"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <p>{label || "Drag & drop files here or click to upload"}</p>
      {value && (
        <ul className="mt-2 text-left text-sm text-gray-700">
          {Array.isArray(value)
            ? value.map((file, idx) => <li key={idx}>{file.name}</li>)
            : (value as File).name}
        </ul>
      )}
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={inputRef}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};

export default FileInput;
