import { motion, AnimatePresence } from "framer-motion";
import { useItemForm } from "../hooks/useItemForm";
import { ProgressBar } from "./forms/ProgressBar";
import { StatusSelect } from "./forms/StatusSelect";
import { FormInput } from "./forms/FormInput";
import { FormTextarea } from "./forms/FormTextarea";
import { FileUpload } from "./forms/FileUpload";

export default function PostItemForm({ user, onItemPosted }) {
  const {
    formData,
    loading,
    successMsg,
    errorMsg,
    uploadProgress,
    handleInputChange,
    handleSubmit,
    errors,
  } = useItemForm(user, onItemPosted);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto px-4 sm:px-0"
    >
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
          <h2 className="text-lg font-semibold text-gray-900">Post a Lost or Found Item</h2>
        </div>

        <div className="p-4 space-y-4">
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{successMsg}</span>
                </div>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{errorMsg}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="title"
              label="Item Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              error={errors.title}
              placeholder="e.g., Black iPhone 16 Pro Max 1 terabyte"
              className="text-sm font-medium focus:ring-blue-500 focus:border-blue-500"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <StatusSelect
                value={formData.status}
                onChange={(value) => handleInputChange("status", value)}
              />
            </div>

            <FormTextarea
              id="description"
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              error={errors.description}
              placeholder="Describe the item, where it was last seen, etc."
              rows={3}
              className="text-sm font-medium focus:ring-blue-500 focus:border-blue-500"
            />

            <FormInput
              id="contactInfo"
              label="Contact Information"
              value={formData.contactInfo}
              onChange={(e) => handleInputChange("contactInfo", e.target.value)}
              required
              error={errors.contactInfo}
              placeholder="Email or phone number"
              type="tel"
              inputMode="email"
              className="text-sm font-medium focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="w-full">
              <FileUpload
                onChange={(file) => handleInputChange("imageFile", file)}
                error={errors.imageFile}
              />
            </div>

            {loading && (
              <div className="pt-2">
                <ProgressBar progress={uploadProgress} />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 text-sm font-medium text-white bg-cyan-500 
                rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-200
              `}
              
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="ml-2">Posting...</span>
                </div>
              ) : (
                <span>Post Item</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
