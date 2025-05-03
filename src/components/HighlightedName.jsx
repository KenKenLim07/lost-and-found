import { motion } from 'framer-motion';

export default function HighlightedName({ name }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-block px-1.5 py-0.5 bg-cyan-300/20 rounded-md font-semibold tracking-wide"
    >
      {name}
    </motion.span>
  );
} 