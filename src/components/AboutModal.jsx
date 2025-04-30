import { motion, AnimatePresence } from "framer-motion";

export default function AboutModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 sm:p-7 mt-[39.3vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                About This App
              </h2>
              
            </div>

            <div className="text-sm text-gray-600 space-y-4">
              <p>
                Hello! I'm Jose Marie Lim, a Computer Science student at Guimaras State University. I built this simple Lost & Found web app using React, Vite, Tailwind CSS, Framer Motion, and Supabase for the backend.
              </p>
              <p>
                Initially, this was just a portfolio project — but then I thought, maybe it could actually help us here at the Mosqueda campus. If you ever lose or find something, you can post it here.
              </p>
              <p>
                Just putting it out there — maybe it’ll come in handy. Thank you!
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
