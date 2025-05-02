import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollLock from "../hooks/useScrollLock";
import useEscapeKey from "../hooks/useEscapeKey";

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

  useScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-xl w-full max-w-sm shadow-xl p-4 sm:p-6 border border-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {isReturned ? "Unmark as Returned" : "Mark as Returned"}
            </h3>

            {isReturned ? (
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to unmark this item as returned?
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-2">{question}</p>
                <input
                  type="text"
                  value={returnedTo}
                  onChange={(e) => onReturnedToChange(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                />
              </>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={!isReturned && !returnedTo.trim()}
                className="w-full sm:w-auto px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
