import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeScale } from "../animations/variants";
import { X } from "lucide-react"; // optional: install lucide-react for elegant icons

export default function FullScreenImageModal({ imageUrl, onClose }) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Escape key closes modal and handle scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    // Lock scroll when modal is open
    if (imageUrl) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);
    
    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restore scroll when modal closes
    };
  }, [imageUrl, onClose]);

  const handleDragEnd = (event, info) => {
    // Only trigger close if we're not zoomed in
    if (scale === 1) {
      const threshold = 100; // Minimum distance to trigger close
      if (Math.abs(info.offset.y) > threshold) {
        onClose();
      }
    }
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

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
        >
          <motion.div
            variants={fadeScale}
            className="relative w-full max-w-4xl mx-4"
          >
            <motion.img
              src={imageUrl}
              alt="Zoomed item"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none touch-none"
              drag={scale === 1 ? "y" : true}
              dragConstraints={scale === 1 ? { top: 0, bottom: 0 } : undefined}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              whileDrag={{ scale: isDragging && scale === 1 ? 0.95 : scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                scale,
                cursor: scale > 1 ? "grab" : "default",
              }}
              onWheel={(e) => {
                if (e.ctrlKey) {
                  e.preventDefault();
                  const newScale = Math.min(Math.max(scale - e.deltaY * 0.01, 1), 3);
                  setScale(newScale);
                }
              }}
              onTouchStart={(e) => {
                if (e.touches.length === 2) {
                  e.preventDefault();
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2) {
                  e.preventDefault();
                  const touch1 = e.touches[0];
                  const touch2 = e.touches[1];
                  const distance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                  );
                  const newScale = Math.min(Math.max(distance / 200, 1), 3);
                  setScale(newScale);
                }
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close full screen image"
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
