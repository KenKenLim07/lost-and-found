import { useState } from "react";

export default function ItemCard({
  item,
  onDelete,
  onImageClick,
  isOwner,
  onToggleReturned,
}) {
  const [isLoading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(item.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 ease-in-out animate-fadeIn flex flex-col h-full relative">
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Image Section */}
      {item.image_url && (
        <>
          <div className="relative w-full aspect-square mb-2">
            <div className="absolute inset-0">
              <img
                src={item.image_url}
                alt={item.title}
                className={`w-full h-full object-cover rounded-xl cursor-pointer transition-all duration-700 ease-in-out ${
                  isLoading
                    ? "grayscale blur-2xl scale-110"
                    : "grayscale-0 blur-0 scale-100"
                }`}
                onClick={() => onImageClick(item.image_url)}
                onLoad={() => setLoading(false)}
              />
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mb-4">
            Tap image to see Full Screen
          </p>
        </>
      )}

      {/* Title */}
      <h3 className="border border-gray-300 rounded-2xl text-lg font-semibold text-center text-black inline-block py-2 px-4 bg-gradient-to-r from-blue-100 to-blue-200 shadow-md">
        {item.title}
      </h3>

      {/* Info Section */}
      <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4 mt-2 flex flex-col justify-between">

        {/* Status Block */}
        <div className="space-y-2">
          {/* Status + Posted Date */}
          <div className="flex justify-between items-center">
            <span
              className={`px-3 py-1 rounded-full font-medium text-xs shadow-md ${
                item.status === "lost"
                  ? "bg-red-100 text-red-700"
                  : item.status === "found"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.status.toUpperCase()}
            </span>

            <div className="text-xs text-gray-400 text-right">
              Posted:
              <br />
              <span className="font-medium">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Returned Status */}
          <div className="flex justify-between items-center transition-all">
            <span
              className={`px-3 py-1 rounded-full font-medium text-xs shadow-md transition-all ${
                item.is_returned
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {item.is_returned ? "RETURNED" : "NOT RETURNED"}
            </span>

            <div className="text-xs text-gray-400 text-right">
              {item.is_returned ? (
                <>
                  Returned:
                  <br />
                  <span className="font-medium">
                    {new Date(item.date_returned).toLocaleDateString()}
                  </span>
                </>
              ) : (
                <>Not yet returned</>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border border-gray-400 p-4 rounded-lg bg-yellow-200">
          <p className="text-xs font-semibold text-gray-700 mb-1">Description:</p>
          <p className="text-xs text-gray-600 break-words line-clamp-5">
            {item.description}
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1">Contact:</p>
          <p className="text-xs text-gray-500 break-words">
            {item.contact_info}
          </p>
        </div>

        {/* Owner Actions (bottom buttons) */}
        {isOwner && (
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => onToggleReturned(item.id, item.is_returned)}
              className="flex-1 text-indigo-600 hover:text-indigo-700 text-xs font-semibold border border-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 px-3 py-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 mr-2"
            >
              {item.is_returned ? "Unmark Returned" : "Mark as Returned"}
            </button>

            <button
              onClick={handleDeleteClick}
              className="flex-1 text-red-600 hover:text-red-700 text-xs font-semibold border border-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 px-3 py-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Remove Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}