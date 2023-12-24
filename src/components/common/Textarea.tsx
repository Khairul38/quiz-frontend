import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: string;
  label?: string;
  mandatory?: boolean;
  supportText?: any;
  size?: "small" | "medium" | "large";
  error?: boolean;
  success?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  type,
  label,
  cols,
  rows,
  mandatory,
  supportText,
  size,
  error,
  success,
  ...props
}) => {
  const padding =
    size === "small"
      ? "px-2 py-1"
      : size === "large"
      ? "px-4 py-3"
      : "px-2 py-2";
  const styles = [
    "form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    padding,
    "disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed",
  ];
  if (error) styles.push("border-rose-300");
  if (success) styles.push("border-emerald-300");

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium mb-1">
            {label}
            {mandatory && <span className="text-rose-500 ml-1">*</span>}
          </label>
        </div>
      )}
      <textarea
        className={styles.join(" ")}
        cols={cols}
        rows={rows}
        {...props}
      />
      {supportText && (
        <div
          className={`text-xs ${
            success ? "text-emerald-500" : error ? "text-rose-500" : ""
          }`}
        >
          {supportText}
        </div>
      )}
    </div>
  );
};

export default Textarea;
