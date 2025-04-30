import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReturnConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isReturned,
  returnedTo,
  onReturnedToChange,
  question,
}) {
  const backdropRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          className="inset-0 fixed bg-black/40 flex items-end justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {isReturned ? "Unmark as Returned" : "Mark as Returned"}
            </h3>

            {isReturned ? (
              <p className="text-gray-600 mb-6">
                Are you sure you want to unmark this item as returned?
              </p>
            ) : (
              <>
                <p className="text-gray-600 mb-3">{question}</p>
                <input
                  type="text"
                  value={returnedTo}
                  onChange={(e) => onReturnedToChange(e.target.value)}
                  placeholder="Enter recipient's name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={!isReturned && !returnedTo.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
