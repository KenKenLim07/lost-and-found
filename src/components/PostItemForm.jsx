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
      className="max-w-xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Post a Lost or Found Item
          </h2>

          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-3 p-2 bg-green-50 border border-green-100 rounded text-sm"
              >
                <div className="flex items-center text-green-700">
                  <svg
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {successMsg}
                </div>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-3 p-2 bg-red-50 border border-red-100 rounded text-sm"
              >
                <div className="flex items-center text-red-700">
                  <svg
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errorMsg}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                id="title"
                label="Item Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
                error={errors.title}
                placeholder="e.g., Black iPhone 13"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
            />

            <FormInput
              id="contactInfo"
              label="Contact Information"
              value={formData.contactInfo}
              onChange={(e) => handleInputChange("contactInfo", e.target.value)}
              required
              error={errors.contactInfo}
              placeholder="Email or phone number"
            />

            <div>
              <FileUpload
                onChange={(file) => handleInputChange("imageFile", file)}
                error={errors.imageFile}
              />
            </div>

            {loading && <ProgressBar progress={uploadProgress} />}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex justify-center py-2 px-4 border border-transparent
                rounded shadow-sm text-sm font-medium text-white
                bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-blue-500
                disabled:bg-blue-300 disabled:cursor-not-allowed
                transition-colors duration-200
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
                  Posting...
                </div>
              ) : (
                "Post Item"
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}