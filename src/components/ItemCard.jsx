import { motion } from "framer-motion";
import { useState } from "react";

export default function ItemCard({
  item,
  onDelete,
  onImageClick,
  isOwner,
  onToggleReturned,
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col h-full relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image */}
      {item.image_url && (
        <>
          <div className="relative w-full aspect-square mb-1">
            <div className="absolute inset-0">
              <img
                src={item.image_url}
                alt={item.title}
                className={`w-full h-full object-cover rounded-xl cursor-pointer hover:scale-105 transition-all duration-700 ease-in-out ${
                  isLoading
                    ? "grayscale blur-2xl scale-110"
                    : "grayscale-0 blur-0 scale-100"
                }`}
                onClick={() => onImageClick(item.image_url)}
                layout="fill"
                objectFit="cover"
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
      <h3 className="border border-gray-300 rounded-2xl mt-2 text-lg font-semibold text-center text-black inline-block py-2 px-4 mb-4 bg-gradient-to-r from-blue-100 to-blue-200 shadow-md">
        {item.title}
      </h3>

      {/* Info Box */}
      <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
        {/* STATUS BLOCK */}
        <div className="space-y-2">
          {/* Old Status */}
          <div className="flex justify-between items-center">
            <span
              className={`px-3 py-1 rounded-full font-medium text-xs ${
                item.status === "lost"
                  ? "bg-red-100 text-red-700"
                  : item.status === "found"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              } shadow-md`}
            >
              {item.status.toUpperCase()}
            </span>

            {/* Date Posted */}
            <div className="text-xs text-gray-400">
              Posted:
              <br />
              <span className="font-medium">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* New Status (Returned) */}
          {item.is_returned && (
            <div className="mt-2 flex justify-between items-center">
              <span className="px-3 py-1 rounded-full font-medium text-xs bg-purple-100 text-purple-700 shadow-md">
                RETURNED
              </span>

              {/* Date Returned */}
              <div className="text-xs text-gray-400">
                Returned:
                <br />
                <span className="font-medium font">
                  {new Date(item.date_returned).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="border border-gray-400 p-4 rounded-lg bg-yellow-200">
          <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
          <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Contact</p>
          <p className="text-xs text-gray-500 break-words">{item.contact_info}</p>
        </div>
      </div>

      {/* Mark as Returned / Unmark */}
      {isOwner && (
        <button
          onClick={() => onToggleReturned(item.id, item.is_returned)}
          className={`mt-3 text-xs ${
            item.is_returned
              ? "text-yellow-600 bg-yellow-100 hover:bg-yellow-200 border border-yellow-300"
              : "text-indigo-600 bg-indigo-100 hover:bg-indigo-200 border border-indigo-300"
          } px-3 py-1 rounded-full transition-all duration-200`}
        >
          {item.is_returned ? "Unmark as Returned" : "Mark as Returned"}
        </button>
      )}

      {/* Delete Button */}
      {isOwner && (
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 text-red-600 hover:text-red-700 text-xs font-semibold border border-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 px-3 py-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
        >
          <span className="sr-only">Delete</span>
          Remove Post
        </button>
      )}
    </motion.div>
  );
}