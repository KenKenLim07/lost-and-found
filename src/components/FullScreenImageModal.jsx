import { motion, AnimatePresence } from "framer-motion";
import { backdropVariant, imageVariant } from "../animations/variants";

const FullScreenImageModal = ({ imageUrl, onClose }) => {
  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={onClose}
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.img
            src={imageUrl}
            alt="Full View"
            className="max-w-full max-h-full object-contain"
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenImageModal;
