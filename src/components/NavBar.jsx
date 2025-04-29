import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { burgerTop, burgerMiddle, burgerBottom } from "../animations/variants";

// Lazy load the AboutModal
const AboutModal = lazy(() => import("./AboutModal"));

// Loading fallback for the modal
const ModalLoadingFallback = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

export default function Navbar({ onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleAbout = () => {
    setShowAbout(true);
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="relative px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">
            Lost & Found
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setShowAbout(true)}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            About
          </button>
          <button
            onClick={onSignOut}
            className="bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow"
          >
            Sign Out
          </button>
        </nav>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="md:hidden relative z-50 flex flex-col justify-center items-end w-8 h-6 gap-[5px] focus:outline-none"
        >
          <motion.span
            animate={burgerTop(menuOpen)}
            className="h-[3px] w-8 bg-gray-700 rounded-full origin-center"
          />
          <motion.span
            animate={burgerMiddle(menuOpen)}
            className="h-[3px] w-7 bg-gray-700 rounded-full origin-center"
          />
          <motion.span
            animate={burgerBottom(menuOpen)}
            className="h-[2px] w-6 bg-gray-700 rounded-full origin-center"
          />
        </button>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-6 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden"
            >
              <button
                onClick={handleAbout}
                className="block w-full text-center px-5 py-3 text-sm text-gray-800 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </button>
              <div className="h-px bg-gray-100"></div>
              <button
                onClick={handleSignOut}
                className="block w-full text-center px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Modal with Suspense */}
      {showAbout && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <AboutModal
            isOpen={showAbout}
            onClose={() => setShowAbout(false)}
          />
        </Suspense>
      )}
    </header>
  );
}
