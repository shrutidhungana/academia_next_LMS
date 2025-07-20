"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import clsx from "clsx";

type Option = {
  id: string;
  label: string;
};

export type FormControl = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "date"
    | "file"
    | "select"
    | "multiselect"
    | "checkbox"
    | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: Option[] | string[];
};

type SectionField = {
  section: string;
  fields: FormControl[];
  layout?: string[][];
};

type FormProps<T extends Record<string, unknown>> = {
  formControls: SectionField[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isBtnDisabled?: boolean;
};

const CommonForm = <T extends Record<string, unknown>>({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}: FormProps<T>) => {
  const renderInput = (control: FormControl) => {
    const value = formData[control.name] ?? "";
    const options =
      typeof control.options?.[0] === "string"
        ? (control.options as string[]).map((opt) => ({ id: opt, label: opt }))
        : (control.options as Option[]) || [];

    const baseInputClasses =
      "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition";

    switch (control.type) {
      case "select":
        return (
          <div className="w-full">
            <Select.Root
              value={typeof value === "string" ? value : ""}
              onValueChange={(val) =>
                setFormData({ ...formData, [control.name]: val })
              }
            >
              <Select.Trigger
                aria-label={control.label}
                className={clsx(
                  "w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm text-gray-700",
                  "hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                )}
              >
                <Select.Value
                  placeholder={control.placeholder || "Select..."}
                />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Content
                className="z-50 w-[--radix-select-trigger-width] overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg"
                position="popper"
              >
                <Select.Viewport className="p-1">
                  {options.map((opt) => (
                    <Select.Item
                      key={opt.id}
                      value={opt.id}
                      className="relative flex cursor-pointer select-none items-center rounded px-4 py-2 text-sm text-gray-800 hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white"
                    >
                      <Select.ItemText>{opt.label}</Select.ItemText>
                      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>
        );

      case "multiselect":
        return (
          <div className="flex max-h-48 flex-col gap-2 overflow-auto rounded-md border border-gray-300 bg-white p-3 shadow-sm">
            {options.map((opt) => {
              const currentValue = formData[control.name];
              const checked =
                Array.isArray(currentValue) && currentValue.includes(opt.id);
              return (
                <Checkbox.Root
                  key={opt.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-gray-700 transition hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  checked={checked}
                  onCheckedChange={(checked) => {
                    let updated: string[] = Array.isArray(
                      formData[control.name]
                    )
                      ? [...(formData[control.name] as string[])]
                      : [];
                    if (checked) {
                      if (!updated.includes(opt.id)) updated.push(opt.id);
                    } else {
                      updated = updated.filter((id) => id !== opt.id);
                    }
                    setFormData({ ...formData, [control.name]: updated });
                  }}
                >
                  <Checkbox.Indicator className="text-indigo-600">
                    <CheckIcon />
                  </Checkbox.Indicator>
                  <span>{opt.label}</span>
                </Checkbox.Root>
              );
            })}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-start gap-2">
            <Checkbox.Root
              id={control.name}
              checked={!!value}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, [control.name]: checked === true })
              }
              className="mt-1 h-5 w-5 rounded border border-gray-300 bg-white text-indigo-600 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <label
              htmlFor={control.name}
              className="text-sm text-gray-700 leading-5 cursor-pointer"
            >
              {control.label}
              {control.required && <span className="ml-1 text-red-600">*</span>}
            </label>
          </div>
        );
       

      case "textarea":
        return (
          <textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={typeof value === "string" ? value : ""}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            rows={4}
            className={clsx(
              baseInputClasses,
              "resize-y",
              "shadow-sm",
              "focus:ring-indigo-500 focus:border-indigo-600"
            )}
          />
        );

      case "file":
        return (
          <input
            id={control.name}
            name={control.name}
            type="file"
            onChange={(e) => {
              setFormData({
                ...formData,
                [control.name]: e.target.files?.[0] || null,
              });
            }}
            className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm transition hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        );

      default:
        return (
          <input
            id={control.name}
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={typeof value === "string" ? value : ""}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-12 max-w-4xl mx-auto font-sans text-gray-800"
      noValidate
    >
      {formControls.map(({ section, fields }) => (
        <section key={section}>
          <h3 className="mb-6 border-b border-indigo-300 pb-2 text-2xl font-semibold text-indigo-700">
            {section}
          </h3>

          {/* Dynamic group logic */}
          <div className="space-y-6">
            {(() => {
              const rows: FormControl[][] = [];
              let currentRow: FormControl[] = [];

              fields.forEach((field, i) => {
                currentRow.push(field);

                // Determine max row length based on field types
                const nextField = fields[i + 1];
                const shouldBreak =
                  currentRow.length === 3 ||
                  field.type === "textarea" ||
                  field.type === "checkbox" ||
                  field.type === "multiselect" ||
                  field.type === "file" ||
                  nextField?.type === "textarea" ||
                  nextField?.type === "checkbox" ||
                  nextField?.type === "multiselect" ||
                  nextField?.type === "file";

                if (shouldBreak || i === fields.length - 1) {
                  rows.push(currentRow);
                  currentRow = [];
                }
              });

              return rows.map((row) => (
                <div
                  key={row}
                  className={`grid gap-6 ${
                    row.length === 1
                      ? "grid-cols-1"
                      : row.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-3"
                  }`}
                >
                  {row.map((control) => (
                    <div key={control.name} className="flex flex-col">
                      {control.type !== "checkbox" &&
                        control.type !== "multiselect" && (
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
            })()}
          </div>
        </section>
      ))}

      <div>
        <Button
          type="submit"
          disabled={isBtnDisabled}
          className={clsx(
            "inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white transition",
            "hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400",
            isBtnDisabled && "cursor-not-allowed opacity-50"
          )}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CommonForm;
