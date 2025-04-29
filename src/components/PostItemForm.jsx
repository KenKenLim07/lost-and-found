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
      className="w-full max-w-xl mx-auto px-3 sm:px-0"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-blue-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Post a Lost or Found Item</h2>
              <p className="text-xs font-medium text-gray-600">Help reunite items with their owners</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-3 p-2.5 bg-green-50 border border-green-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center text-green-700">
                  <svg
                    className="h-4 w-4 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium">{successMsg}</span>
                </div>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center text-red-700">
                  <svg
                    className="h-4 w-4 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium">{errorMsg}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                id="title"
                label="Item Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
                error={errors.title}
                placeholder="e.g., Black iPhone 13"
                className="focus:ring-blue-500 focus:border-blue-500"
              />

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <StatusSelect
                  value={formData.status}
                  onChange={(value) => handleInputChange("status", value)}
                />
              </div>
            </div>

            <FormTextarea
              id="description"
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              error={errors.description}
              placeholder="Provide details about the item, where it was last seen, etc."
              rows={3}
              className="focus:ring-blue-500 focus:border-blue-500"
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
              className="focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="w-full">
              <FileUpload
                onChange={(file) => handleInputChange("imageFile", file)}
                error={errors.imageFile}
              />
            </div>

            {loading && (
              <div className="pt-1">
                <ProgressBar progress={uploadProgress} />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex justify-center py-2.5 px-4 border border-transparent
                rounded-lg shadow-sm text-xs font-medium text-white
                bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:from-blue-300 disabled:to-blue-400 disabled:cursor-not-allowed
                transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                touch-manipulation
              `}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  <span className="font-medium">Posting Item...</span>
                </div>
              ) : (
                <span className="font-medium">Post Item</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}