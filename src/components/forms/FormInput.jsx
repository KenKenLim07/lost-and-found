import { forwardRef } from "react";

export const FormInput = forwardRef(({ 
  label, 
  error, 
  className = "", 
  required = false,
  ...props 
}, ref) => {
  return (
    <div className="space-y-0.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-2 py-1.5 text-sm border rounded
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <p 
          id={`${props.id}-error`}
          className="text-xs text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}); 