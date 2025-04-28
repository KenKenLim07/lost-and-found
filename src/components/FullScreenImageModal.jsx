import { motion, AnimatePresence } from "framer-motion";
import { fadeScale } from "../animations/variants";
export default function FullScreenImageModal({ imageUrl, onClose }) {
  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          variants={fadeScale}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        >
          <motion.div
            className="relative max-w-4xl w-full mx-4"
            variants={fadeScale}
          >
            <img
              src={imageUrl}
              alt="Full Screen"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />

            {/* Go Back Text */}
            <button
              onClick={onClose}
              className="absolute -top-30 left-2 text-white text-2xl px-3 py-1 bg-black/60 rounded-xl hover:bg-black/80 transition"
            >
              x
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
