import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FileUpload = ({ 
  onChange, 
  accept = "image/*",
  maxSize = 10, // in MB
  error 
}) => {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    onChange?.(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-1">
      <div
        className={`
          relative border border-dashed rounded p-2
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
        
        <div className="text-center">
          <div className="flex items-center justify-center text-xs text-gray-600">
            <button
              type="button"
              onClick={handleButtonClick}
              className="relative rounded font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <span>Upload a file</span>
            </button>
            <span className="mx-1">or drag and drop</span>
            <span className="text-gray-400">PNG, JPG, GIF up to {maxSize}MB</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative mt-1"
          >
            <img
              src={preview}
              alt="Preview"
              className="max-h-24 rounded object-cover mx-auto"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                onChange?.(null);
              }}
              className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}; 