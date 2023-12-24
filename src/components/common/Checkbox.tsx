import React, { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  name,
  ...props
}) => {
  return (
    <div className={className}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          className="form-checkbox cursor-pointer rounded-full focus:ring-transparent"
          {...props}
        />
        <span className="text-sm ml-2">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
