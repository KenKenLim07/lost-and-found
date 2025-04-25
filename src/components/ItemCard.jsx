import { motion } from "framer-motion";

export default function ItemCard({ item, onDelete, onImageClick, isOwner }) {
  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col h-full relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image */}
      {item.image_url && (
        <div className="relative w-full aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3 mb-4">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick(item.image_url)}
          />
          <p className="text-xs text-gray-400 text-center">Tap image to zoom</p>
        </div>
      )}

      {/* Title */}
      <h3 className="border border-gray-300 rounded-2xl mt-2 text-lg font-semibold text-center text-black inline-block py-2 px-4 mb-4 bg-gradient-to-r from-blue-100 to-blue-200 shadow-md">
        {item.title}
      </h3>

      {/* Grouped Info */}
      <div className="mt-3 flex-1 border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
        {/* Status and Date */}
        <div className="flex justify-between items-center text-xs">
          {/* Status Badge */}
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
          <div className="text-right">
            <p className="text-gray-400">Date Posted:</p>
            <p className="text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Description */}
        <div className="border border-gray-400 p-3 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
          <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Contact</p>
          <p className="text-xs text-gray-500 break-words">{item.contact_info}</p>
        </div>
      </div>

      {/* Delete and Edit Buttons */}
      {isOwner && (
        <>
          {/* Edit Button */}
          <button
            onClick={() => alert("Edit functionality goes here")} // Implement edit functionality
            className="absolute bottom-2 left-2 text-blue-500 hover:text-blue-700 text-xs border border-blue-300 bg-white px-3 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="sr-only">Edit</span>
            ✏️
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(item.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs border border-red-300 bg-white px-3 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="sr-only">Delete</span>
            🗑️
          </button>
        </>
      )}
    </motion.div>
  );
}
