import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc' // Google icon (optional)

export default function AuthForm() {
  // 🔐 Auth-related states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // 📥 Handle email/password login or signup
  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  // 🟢 Handle Google OAuth login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      setError(error.message)
    }
  }

  // ✨ Animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.div
      className="w-full max-w-sm mx-auto p-4 sm:p-6 min-h-[100dvh] flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-4 sm:space-y-6 w-full"
        variants={itemVariants}
      >
        <motion.div 
          className="text-center space-y-2 sm:space-y-3"
          variants={itemVariants}
        >
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="text-sm text-gray-500 font-medium">
              Hello
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 tracking-wide">
              Mosquedians!
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-800">
            <span className="opacity-60">Lost</span> or <span className="font-bold">found</span> something?
          </p>
          <p className="text-xs text-gray-500 italic">
            Congrats! "New Side Quest unlocked: return it."
          </p>
        </motion.div>

        <form onSubmit={handleAuth} className="space-y-3 sm:space-y-4">
          <motion.div variants={itemVariants}>
            <input
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm sm:text-base"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm sm:text-base"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs sm:text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full py-2.5 sm:py-3 rounded-xl text-white font-medium text-sm sm:text-base ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </motion.button>

          <motion.button
            onClick={handleGoogleLogin}
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full py-2.5 sm:py-3 flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium text-sm sm:text-base"
          >
            <FcGoogle size={18} className="sm:w-5 sm:h-5" />
            Continue with Google
          </motion.button>
        </form>

        <motion.div
          className="text-center text-xs sm:text-sm text-gray-600"
          variants={itemVariants}
        >
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="transition-colors"
          >
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <span className="text-blue-600 font-semibold hover:underline">
                  Log in
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span className="text-blue-600 font-semibold hover:underline">
                  Sign up
                </span>
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
