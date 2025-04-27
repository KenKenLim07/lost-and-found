import { motion, AnimatePresence } from "framer-motion";

export default function AboutModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">About Lost & Found</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Lost & Found is a community-driven platform designed to help people recover their lost items and connect with those who have found them. Our mission is to make the process of returning lost items as simple and efficient as possible.
              </p>
              
              <p>
                Founded in 2023, our platform has helped thousands of people reunite with their belongings. We believe that by leveraging technology and community, we can create a more connected world where lost items find their way back home.
              </p>
              
              <p>
                Our platform features real-time updates, image recognition technology, and a user-friendly interface to ensure the best possible experience for both those who have lost items and those who have found them.
              </p>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Values</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Community-driven approach</li>
                  <li>Privacy and security</li>
                  <li>Ease of use</li>
                  <li>Transparency</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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