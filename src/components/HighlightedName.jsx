import { motion } from 'framer-motion';

export default function HighlightedName({ name }) {
  return (
    <motion.span
      className="text-yellow-300 font-semibold"
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {name}
    </motion.span>
  );
}
