import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeScale } from "../animations/variants";
import { X } from "lucide-react"; // optional: install lucide-react for elegant icons

export default function FullScreenImageModal({ imageUrl, onClose }) {
  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Escape key closes modal (fallback for desktop users)
  useEffect(() => {
    if (!imageUrl) return; // don't do anything if modal is not shown
  
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
  
    // Lock scroll
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      // Cleanup
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [imageUrl, onClose]);
  
  

  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          variants={fadeScale}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          onClick={handleBackdropClick} // Allow backdrop click to close
        >
          <motion.div
            variants={fadeScale}
            className="relative w-full max-w-4xl mx-4"
          >
            <img
              src={imageUrl}
              alt="Zoomed item"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg"
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close full screen image"
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white sm:top-2 sm:right-2"
            >
              <X className="w-6 h-6" />
            </button>


          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
