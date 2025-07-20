"use client";

import React from "react";
import { Button } from "@radix-ui/themes";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";

export type FormControl = {
  name: string;
  label: string;
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
};

const CommonForm = <T extends Record<string, unknown>>({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled = false,
}: FormProps<T>) => {
  const renderInput = (control: FormControl) => {
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
              aria-label={control.label}
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
      case "checkbox":
        return (
          <label className="flex items-center gap-2">
            <Checkbox.Root
              checked={Boolean(formData[control.name])}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  [control.name]: !!checked,
                })
              }
              className="flex h-[18px] w-[18px] items-center justify-center rounded border border-gray-300 bg-white shadow-sm"
            >
              <Checkbox.Indicator>
                <CheckIcon className="text-indigo-600" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm text-gray-800">{control.label}</span>
          </label>
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
            {control.type !== "checkbox" && control.type !== "multiselect" && (
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
        ? // Multi-section form like Register
          (formControls as SectionField[]).map(({ section, fields }) => (
            <section key={section}>
              <h3 className="mb-6 border-b border-indigo-300 pb-2 text-2xl font-semibold text-indigo-700">
                {section}
              </h3>
              <div>{renderFieldGroups(fields)}</div>
            </section>
          ))
        : // Flat form like Login — force 1 field per row
          renderFieldGroups(formControls as FormControl[], true)}

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
