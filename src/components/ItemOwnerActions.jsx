export default function ItemOwnerActions({ 
  isReturned, 
  onReturnClick, 
  onDeleteClick 
}) {
  return (
    <div className="-mt-2 flex justify-between items-center">
      <button
        onClick={onReturnClick}
        className="flex-1 text-black-600 hover:text-indigo-700 text-xs font-semibold border border-green-700 bg-green-100 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 px-3 py-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 mr-2"
      >
        {isReturned ? "Unmark Returned" : "Mark as Returned"}
      </button>

      <button
        onClick={onDeleteClick}
        className="flex-1 text-black-600 hover:text-red-700 text-xs font-semibold border border-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 px-3 py-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
      >
        Remove Post
      </button>
    </div>
  );
} 