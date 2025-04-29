import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FileUpload({ onChange, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative w-full h-20 border-2 border-dashed rounded-md
          flex flex-col items-center justify-center gap-0.5
          transition-colors duration-200
          ${isDragging 
            ? 'border-blue-400 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }
          cursor-pointer
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*"
          className="hidden"
        />
        
        <AnimatePresence>
          {preview ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex items-center justify-center p-1"
            >
              <img
                src={preview}
                alt="Preview"
                className="max-h-full max-w-full object-contain rounded"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  onChange(null);
                }}
                className="absolute top-1 right-1 p-0.5 bg-white/80 rounded-full shadow-sm hover:bg-white"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-0.5 px-2 text-center"
            >
              <svg
                className={`w-5 h-5 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="space-y-0.5">
                <p className="text-[11px] font-medium text-gray-700">
                  Upload a file
                </p>
                <p className="text-[10px] text-gray-500">
                  or drag and drop
                </p>
                <p className="text-[10px] text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <p className="mt-0.5 text-[11px] text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
} 