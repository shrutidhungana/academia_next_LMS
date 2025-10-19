"use client";
import React, { useState, useRef } from "react";
import { Button } from "@radix-ui/themes";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import FileInput from "../File";
import ReCAPTCHA from "react-google-recaptcha";

export type FormControl = {
  name: string;
  label: string | React.ReactNode;
  type: string;
  required?: boolean;
  options?: { id: string; label: string }[];
};

export type SectionField = {
  section: string;
  fields: FormControl[];
};

type FormProps<T extends Record<string, unknown>> = {
  formControls: SectionField[] | FormControl[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isBtnDisabled?: boolean;
  onUpload?: (file: File) => void;
};

const CommonForm = <T extends Record<string, unknown>>({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled = false,
  onUpload,
}: FormProps<T>) => {
  // Track which password fields are visible
  const [showPasswordFields, setShowPasswordFields] = useState<
    Record<string, boolean>
    >({});
    const recaptchaRef = useRef<ReCAPTCHA>(null);

  const renderInput = (control: FormControl) => {
    const togglePassword = () => {
      setShowPasswordFields((prev) => ({
        ...prev,
        [control.name]: !prev[control.name],
      }));
    };

    const commonProps = {
      id: control.name,
      name: control.name,
      required: control.required,
      value: formData[control.name] as string,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setFormData({ ...formData, [control.name]: e.target.value }),
      className:
        "w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400",
    };

    switch (control.type) {
      case "password":
        return (
          <div className="relative">
            <input
              type={showPasswordFields[control.name] ? "text" : "password"}
              {...commonProps}
              className="w-full rounded-lg border border-gray-300 p-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={togglePassword}
            >
              {showPasswordFields[control.name] ? (
                <RxEyeOpen className="text-gray-600" />
              ) : (
                <GoEyeClosed className="text-gray-600" />
              )}
            </button>
          </div>
        );

      case "textarea":
        return <textarea rows={4} {...commonProps} />;

      case "select":
        return (
          <Select.Root
            onValueChange={(val) =>
              setFormData({ ...formData, [control.name]: val })
            }
            value={formData[control.name] as string}
          >
            <Select.Trigger
              className="inline-flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label={
                typeof control.label === "string" ? control.label : ""
              }
            >
              <Select.Value placeholder={control.label} />
              <Select.Icon className="ml-2">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Content className="rounded-md bg-white shadow-lg">
              <Select.Viewport className="p-1">
                {control.options?.map((option) => (
                  <Select.Item
                    key={option.id}
                    value={option.id}
                    className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-indigo-100"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        );

      case "multiselect":
        const selectedValues = (formData[control.name] || []) as string[];
        const toggleValue = (value: string) => {
          const updated = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
          setFormData({ ...formData, [control.name]: updated });
        };
        return (
          <div className="flex flex-wrap gap-3">
            {control.options?.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.id)}
                  onChange={() => toggleValue(option.id)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-2">
            <Checkbox.Root
              id={control.name}
              checked={Boolean(formData[control.name])}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, [control.name]: !!checked })
              }
              className="flex h-[18px] w-[18px] items-center justify-center rounded border border-gray-300 bg-white shadow-sm"
            >
              <Checkbox.Indicator>
                <CheckIcon className="text-indigo-600" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm text-gray-800 flex items-center gap-1">
              {control.label}
              {control.required && <span className="text-red-600">*</span>}
            </span>
          </label>
        );

      case "file":
        const variant =
          control.name === "profilePicture" ? "avatar" : "dropzone";
        const multiple = variant === "dropzone";

        return (
          <FileInput
            value={formData[control.name] as File | File[] | null}
            onChange={(file) =>
              setFormData({ ...formData, [control.name]: file })
            }
            onUpload={control.name === "profilePicture" ? onUpload : undefined}
            variant={variant}
            multiple={multiple}
            accept={variant === "avatar" ? "image/*" : "*"}
            label={typeof control.label === "string" ? control.label : ""}
          />
        );

      case "captcha":
        return (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token: string | null) => {
              if (token) {
                setFormData({ ...formData, captcha: token });
              }
            }}
          />
        );

      default:
        return <input type={control.type} {...commonProps} />;
    }
  };

  const renderFieldGroups = (fields: FormControl[], forceOnePerRow = false) => {
    const rows: FormControl[][] = [];
    let currentRow: FormControl[] = [];

    fields.forEach((field, i) => {
      currentRow.push(field);
      const nextField = fields[i + 1];
      const shouldBreak =
        forceOnePerRow ||
        currentRow.length === 3 ||
        ["textarea", "checkbox", "multiselect", "file"].includes(field.type) ||
        ["textarea", "checkbox", "multiselect", "file"].includes(
          nextField?.type || ""
        ) ||
        i === fields.length - 1;

      if (shouldBreak) {
        rows.push(currentRow);
        currentRow = [];
      }
    });

    return rows.map((row, idx) => (
      <div
        key={idx}
        className={clsx(
          "mb-6 grid gap-6",
          row.length === 1
            ? "grid-cols-1"
            : row.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
        )}
      >
        {row.map((control) => (
          <div key={control.name} className="flex flex-col">
            {control.type !== "checkbox" && (
              <label
                htmlFor={control.name}
                className="mb-1 block text-sm font-medium text-indigo-900"
              >
                {control.label}
                {control.required && (
                  <span className="ml-1 text-red-600">*</span>
                )}
              </label>
            )}
            {renderInput(control)}
          </div>
        ))}
      </div>
    ));
  };

  const isSectionBased =
    Array.isArray(formControls) &&
    formControls.length > 0 &&
    "fields" in formControls[0];

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {isSectionBased
        ? (formControls as SectionField[]).map(({ section, fields }) => (
            <section key={section}>
              <h3 className="mb-6 border-b border-indigo-300 pb-2 text-2xl font-semibold text-indigo-700">
                {section}
              </h3>
              <div>{renderFieldGroups(fields)}</div>
            </section>
          ))
        : renderFieldGroups(formControls as FormControl[], true)}

      <div>
        <Button
          disabled={isBtnDisabled}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CommonForm;
