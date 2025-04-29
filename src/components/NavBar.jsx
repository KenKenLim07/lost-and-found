import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { burgerTop, burgerMiddle, burgerBottom } from "../animations/variants";
import AboutModal from "./AboutModal";

export default function Navbar({ onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="relative px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-500">Lost & Found</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setShowAbout(true)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </button>
        <button
          onClick={onSignOut}
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sign Out
        </button>
        </div>

        {/* Burger Icon (Mobile) */}
        <div
          className="md:hidden flex flex-col justify-center items-end w-8 h-6 gap-[5px] cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <motion.span
            animate={burgerTop(menuOpen)}
            className="h-[4px] w-8 bg-black rounded origin-center"
          />
          <motion.span
            animate={burgerMiddle(menuOpen)}
            className="h-[3px] w-7 bg-black rounded origin-center"
          />
          <motion.span
            animate={burgerBottom(menuOpen)}
            className="h-[2px] w-6 bg-black rounded origin-center"
          />
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-6 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
            >
              <button
                onClick={() => {
                  setShowAbout(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                About
              </button>
              <button
                onClick={() => {
                  onSignOut();
                  setMenuOpen(false);
                }}
                className="block w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-b-lg"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Modal - Now using the modular component */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </header>
  );
}
