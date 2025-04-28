export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Confirm Delete
        </h3>
        <p className="text-xs text-gray-600 mb-2">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        
        <div className="flex justify-between space-x-2">
          <button 
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-xs transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
