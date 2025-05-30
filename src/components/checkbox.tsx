
import * as React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-purple-500"
      {...props}
    />
  );
};
