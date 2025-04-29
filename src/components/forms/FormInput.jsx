import { forwardRef } from "react";

export const FormInput = forwardRef(({ 
  label, 
  error, 
  className = "", 
  required = false,
  type = "text",
  ...props 
}, ref) => {
  // Determine the appropriate inputMode based on type
  let inputMode = "text";
  if (type === "email") inputMode = "email";
  if (type === "tel") inputMode = "tel";
  if (type === "number") inputMode = "numeric";
  if (type === "url") inputMode = "url";

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          inputMode={inputMode}
          autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
          className={`
            w-full px-4 py-2.5 text-base
            bg-white border rounded-lg
            shadow-sm
            transition-all duration-200 ease-in-out
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${className}
            touch-manipulation
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p 
          id={`${props.id}-error`}
          className="text-xs text-red-600 font-medium mt-1 flex items-center"
          role="alert"
        >
          <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}); 