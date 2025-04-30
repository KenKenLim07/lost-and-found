import { motion } from "framer-motion";

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white max-w-lg w-full rounded-xl p-6 shadow-xl text-center border border-gray-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <motion.h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About This Project
        </motion.h2>

        <motion.p
          className="text-sm text-gray-600 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Hello! I'm <span className="font-semibold">Jose Marie Lim</span>, a Computer Science student at{' '}
          <span className="font-semibold">Guimaras State University</span>.
        </motion.p>

        <motion.p
          className="text-sm text-gray-600 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          I built this Lost & Found web app using <span className="font-medium">React</span>,{' '}
          <span className="font-medium">Vite</span>, <span className="font-medium">Tailwind CSS</span>, and{' '}
          <span className="font-medium">Supabase</span> for the backend.
        </motion.p>

        <motion.p
          className="text-sm text-gray-600 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          It started as a portfolio project — but I thought it might actually help people here at the{' '}
          <span className="font-medium">Mosqueda campus</span>. If you ever lose or find something, you can post it here!
        </motion.p>

        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Just putting it out there — maybe it’ll come in handy. Thank you!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AboutModal;
