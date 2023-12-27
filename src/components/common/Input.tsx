import React, { InputHTMLAttributes } from "react";

// @ts-ignore
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  mandatory?: boolean;
  supportText?: any;
  size?: "small" | "large";
  error?: boolean;
  success?: boolean;
  className?: string;
  hookForm?: any;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  mandatory,
  supportText,
  size,
  error,
  success,
  className,
  hookForm,
  ...props
}) => {
  const padding =
    size === "small"
      ? "px-2 py-1"
      : size === "large"
      ? "px-4 py-3"
      : "px-2.5 py-2.5";
  const styles = [
    "form-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400/90 dark:placeholder-gray-400/80 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    padding,
    "disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed",
    className,
  ];
  if (error) styles.push("!border-rose-300");
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
      <input
        className={styles.join(" ")}
        type={type}
        {...hookForm}
        {...props}
      />
      {supportText && (
        <div
          className={`text-xs mt-1 ${
            success ? "text-emerald-500" : error ? "text-rose-500" : ""
          }`}
        >
          {supportText}
        </div>
      )}
    </div>
  );
};

export default Input;
