import React, { useState, ChangeEvent, SelectHTMLAttributes } from "react";

interface Option {
  text: string;
  value: any;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: Option[];
  mandatory?: boolean;
  placeholder?: string;
  defaultValue?: string;
  defaultBlank?: boolean;
  type?: string;
  value?: any;
  disabled?: boolean;
  hookForm?: any;
}

function Select({
  label,
  options,
  mandatory,
  placeholder,
  defaultValue,
  defaultBlank,
  type,
  value,
  disabled,
  hookForm,
  ...props
}: SelectProps) {
  const [prestine, setPrestine] = useState(true);
  const empty = (!options && !type) || options?.length === 0;
  //@ts-ignore
  if (empty || defaultBlank) props.defaultValue = "";
  if (!defaultBlank && defaultValue !== undefined)
    //@ts-ignore
    props.defaultValue = defaultValue;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {mandatory && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } ${(empty || (defaultBlank && prestine)) && "text-slate-400"}`}
        value={value}
        disabled={disabled ? disabled : false}
        {...hookForm}
        {...props}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setPrestine(false);
          if (props.onChange) props.onChange(e);
        }}
      >
        {!empty ? (
          <>
            {defaultBlank && (
              <option
                className="text-gray-400/90 dark:text-gray-400/80"
                value=""
                disabled
                hidden
              >
                {placeholder}
              </option>
            )}
            {options !== undefined &&
              options.map(({ text, value }, index) => (
                <option
                  className="text-slate-800 dark:text-gray-400"
                  key={index}
                  value={value}
                >
                  {text}
                </option>
              ))}
          </>
        ) : (
          <>
            <option
              className="text-gray-400/90 dark:text-gray-400/80"
              value=""
              disabled
              hidden
            >
              {placeholder}
            </option>
            <option value="__empty" disabled>
              Empty
            </option>
          </>
        )}
      </select>
    </div>
  );
}

export default Select;
