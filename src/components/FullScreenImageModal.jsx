import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeScale } from "../animations/variants";
import { X } from "lucide-react";

export default function FullScreenImageModal({ imageUrl, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (imageUrl) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      const scrollY = document.body.dataset.scrollY || "0";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      window.removeEventListener("keydown", handleKeyDown);
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
