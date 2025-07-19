"use client"

import React from "react";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

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
  options?: Option[];
};

type FormProps<T extends Record<string, unknown>> = {
  formControls: FormControl[];
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

    switch (control.type) {
      case "select":
        return (
          <Select.Root
            value={typeof value === "string" ? value : ""}
            onValueChange={(val) =>
              setFormData({ ...formData, [control.name]: val })
            }
          >
            <Select.Trigger
              aria-label={control.label}
              className="flex items-center justify-between w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Select.Value placeholder={control.placeholder || "Select..."} />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Content className="overflow-hidden rounded-md border bg-white shadow-lg">
              <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                ▲
              </Select.ScrollUpButton>
              <Select.Viewport>
                {control.options?.map((opt) => (
                  <Select.Item
                    key={opt.id}
                    value={opt.id}
                    className="relative flex items-center px-8 py-2 text-sm text-gray-700 cursor-pointer select-none hover:bg-indigo-600 hover:text-white"
                  >
                    <Select.ItemText>{opt.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                ▼
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Root>
        );

      case "multiselect":
        // Render multiple checkboxes
        return (
          <div className="flex flex-col gap-1 max-h-48 overflow-auto border rounded-md p-2">
            {control.options?.map((opt) => {
             const currentValue = formData[control.name];
             const checked =
               Array.isArray(currentValue) && currentValue.includes(opt.id);
              return (
                <Checkbox.Root
                  key={opt.id}
                  className="flex items-center gap-2"
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
          <Checkbox.Root
            checked={!!value}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, [control.name]: checked === true })
            }
            className="flex items-center gap-2"
          >
            <Checkbox.Indicator className="text-indigo-600">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
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
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
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
            className="w-full"
          />
        );

      default:
        // text, email, password, tel, date
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {formControls.map((control) => (
        <div key={control.name} className="flex flex-col">
          <label
            htmlFor={control.name}
            className="mb-1 font-medium text-gray-700 flex items-center gap-1"
          >
            {control.label}
            {control.required && <span className="text-red-600">*</span>}
          </label>
          {renderInput(control)}
        </div>
      ))}

      <button
        type="submit"
        disabled={isBtnDisabled}
        className={`w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default CommonForm;
