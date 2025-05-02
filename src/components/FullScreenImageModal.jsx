import { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { fadeScale } from "../animations/variants";
import { X } from "lucide-react"; // optional: install lucide-react for elegant icons

export default function FullScreenImageModal({ imageUrl, onClose }) {
  const controls = useAnimation();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (imageUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [imageUrl]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleDragEnd = async (event, info) => {
    const threshold = 100; // pixels to drag before closing
    const velocity = info.velocity.y;

    if (Math.abs(info.offset.y) > threshold || Math.abs(velocity) > 500) {
      await controls.start({ y: info.offset.y > 0 ? "100%" : "-100%", opacity: 0 });
      onClose();
    } else {
      controls.start({ y: 0, opacity: 1 });
    }
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
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="relative w-full max-w-4xl mx-4 cursor-grab active:cursor-grabbing"
          >
            <motion.img
              src={imageUrl}
              alt="Zoomed item"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none"
              style={{ touchAction: "none" }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close full screen image"
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Drag Indicator */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
