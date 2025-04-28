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
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4">
        <h3 className="text-sm font-semibold text-gray-800">
          {isReturned ? "Unmark as Returned" : "Mark as Returned"}
        </h3>

        {isReturned ? (
          <p className="text-xs text-gray-600">Are you sure you want to unmark as returned?</p>
        ) : (
          <>
            <p className="text-xs text-gray-600 mb-2">{returnQuestion}</p>
            <input
              type="text"
              value={returnedTo}
              onChange={(e) => onReturnedToChange(e.target.value)}
              placeholder="Enter the name of the person"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </>
        )}
        
        <div className="flex justify-between space-x-2">
          <button 
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-xs transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={!isReturned && !returnedTo.trim()}
            className={`px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs transition-colors 
              ${!isReturned && !returnedTo.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
