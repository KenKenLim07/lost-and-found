import { motion } from "framer-motion";

export default function ItemCard({ item, onDelete, onImageClick, isOwner }) {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-md relative hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image */}
      {item.image_url && (
        <>
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg mb-3 cursor-pointer"
            onClick={() => onImageClick(item.image_url)}
          />
          <p className="text-xs text-gray-400 text-center -mt-2 mb-3">
            Tap image to zoom
          </p>
        </>
      )}

{/* Title in separate bordered box */}
<div className="border-1 border-black-300 bg-gray-50 rounded-2xl px-3 py-2 mb-3">
  <h3 className="text-lg font-bold text-black text-center truncate">
    {item.title}
  </h3>
</div>


      {/* Grouped Details Section */}
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50 space-y-3">
        {/* Status & Date */}
        <div className="flex justify-between items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              item.status === "lost"
                ? "bg-yellow-100 text-yellow-700"
                : item.status === "found"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {item.status.toUpperCase()}
          </span>
          <p className="text-xs text-gray-400">
            {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-700 font-semibold mb-1">Description</p>
          <p className="text-sm text-gray-600 break-words">{item.description}</p>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-sm text-gray-700 font-semibold mb-1">Contact</p>
          <p className="text-xs text-gray-500 break-words">{item.contact_info}</p>
        </div>
      </div>

      {/* Delete Button */}
      {isOwner && (
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs border px-2 py-1 border-red-300 rounded-md bg-white"
        >
          Delete
        </button>
      )}
    </motion.div>
  );
}
