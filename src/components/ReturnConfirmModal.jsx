export default function ReturnConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isReturned,
  returnedTo,
  onReturnedToChange,
  returnQuestion 
}) {
  if (!isOpen) return null;

  return (
    <div className="inset-0 fixed bg-opacity-50 flex items-end justify-center bottom-10 z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
        <h3 className="text-lg font-semibold mb-4">
          {isReturned ? "Unmark as Returned" : "Mark as Returned"}
        </h3>
        
        {isReturned ? (
          <p className="text-gray-600 mb-6">Unmark as returned?</p>
        ) : (
          <>
            <p className="text-gray-600 mb-4">{returnQuestion}</p>
            <input
              type="text"
              value={returnedTo}
              onChange={(e) => onReturnedToChange(e.target.value)}
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
            />
          </>
        )}
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={!isReturned && !returnedTo.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
} 