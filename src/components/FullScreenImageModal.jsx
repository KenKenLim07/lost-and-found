import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { fadeScale } from "../animations/variants";
import { X } from "lucide-react";

export default function FullScreenImageModal({ imageUrl, onClose }) {
  const controls = useAnimation();
  const [scale, setScale] = useState(1);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-300, 0, 300], [0, 1, 0]);
  const lastTap = useMotionValue(0);

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

    if (scale === 1 && (Math.abs(info.offset.y) > threshold || Math.abs(velocity) > 500)) {
      await controls.start({ y: info.offset.y > 0 ? "100%" : "-100%", opacity: 0 });
      onClose();
    } else {
      controls.start({ y: 0, opacity: 1 });
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap.get() < DOUBLE_TAP_DELAY) {
      setScale(scale === 1 ? 2 : 1);
    }
    lastTap.set(now);
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
            drag={scale === 1 ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ y, opacity }}
            className="relative w-full max-w-4xl mx-4"
          >
            <motion.div
              className="relative"
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.img
                src={imageUrl}
                alt="Zoomed item"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-lg select-none"
                style={{ touchAction: "none" }}
                onTap={handleDoubleTap}
                whileTap={{ scale: 0.95 }}
                drag={scale > 1}
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.1}
                dragMomentum={false}
                onPinchStart={() => {
                  if (scale === 1) setScale(2);
                }}
                onPinchEnd={() => {
                  if (scale > 1) setScale(1);
                }}
              />
            </motion.div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close full screen image"
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 transition-colors p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Drag Indicator - Only show when not zoomed */}
            {scale === 1 && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
