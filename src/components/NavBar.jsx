import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="relative px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-700">Lost & Found</h1>

        {/* Desktop Sign Out */}
        <button
          onClick={onSignOut}
          className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sign Out
        </button>

        {/* Burger Icon (Mobile) */}
        <div
          className="md:hidden flex flex-col justify-center items-end w-8 h-6 gap-[5px] cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`h-[4px] w-8 bg-black rounded transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              menuOpen ? "rotate-45 translate-y-[10px]" : ""
            }`}
          />
          <span
            className={`h-[3px] w-7 bg-black rounded transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black rounded transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
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
                  onSignOut();
                  setMenuOpen(false);
                }}
                className="block w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-t-lg"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
