import { motion } from "framer-motion";

export default function ItemCard({ item, onDelete, onImageClick, isOwner }) {
  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image */}
      {item.image_url && (
        <div className="relative">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-40 sm:h-48 object-cover rounded-xl cursor-pointer"
            onClick={() => onImageClick(item.image_url)}
          />
          <p className="text-xs text-gray-400 text-center mt-1">Tap image to zoom</p>
        </div>
      )}

      {/* Title */}
      <h3 className="mt-3 text-lg font-bold text-center text-black truncate">{item.title}</h3>

      {/* Grouped Info */}
      <div className="mt-3 flex-1 border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-3">
        {/* Status and Date */}
        <div className="flex justify-between items-center text-xs">
          <span
            className={`px-2 py-1 rounded-full font-medium ${
              item.status === "lost"
                ? "bg-yellow-100 text-yellow-700"
                : item.status === "found"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {item.status.toUpperCase()}
          </span>
          <p className="text-gray-400">{new Date(item.created_at).toLocaleDateString()}</p>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
          <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Contact</p>
          <p className="text-xs text-gray-500 break-words">{item.contact_info}</p>
        </div>
      </div>

      {/* Delete */}
      {isOwner && (
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs border border-red-300 bg-white px-2 py-1 rounded-md"
        >
          Delete
        </button>
      )}
    </motion.div>
  );
}
