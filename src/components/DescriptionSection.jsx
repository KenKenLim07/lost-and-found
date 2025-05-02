import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollLock from "../hooks/useScrollLock";

export default function DescriptionSection({
  description,
  isLongDescription,
  isModalOpen,
  onModalOpen,
  onModalClose,
}) {
  const backdropRef = useRef(null);

  useScrollLock(isModalOpen);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onModalClose();
  };

  return (
    <>
      <div className="-mt-3">
        <div className="flex items-center mb-1.5">
          <svg
            className="w-4 h-4 text-amber-500 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-xs font-medium text-amber-700">Description:</p>
        </div>

        <div className="relative mb-2">
          <div
            className="-mt-1 mr-auto text-xm mx-4 sm:mx-[35px] relative text-sm text-gray-800 break-words pl-4 pr-4 py-1 bg-amber-100 border-[1px] border-amber-300 rounded-xl rounded-bl-none shadow-sm overflow-hidden line-clamp-3 leading-[1.3rem] h-[4.3rem]"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </div>

          {isLongDescription && (
            <button
              onClick={onModalOpen}
              className="text-[12px] text-amber-700 font-medium -mt-1 ml-auto mr-4 sm:mr-[35px] block"
            >
              Read more
            </button>
          )}
        </div>
      </div>

      {/* Description Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            ref={backdropRef}
            className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-[65vh] p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="bg-white rounded-xl w-[90%] max-w-2xl shadow-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold sm:text-lg text-gray-800">
                  Item Description
                </h3>
                <button
                  onClick={onModalClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-gray-700 whitespace-pre-wrap text-sm">
                {description}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
