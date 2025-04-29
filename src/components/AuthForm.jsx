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
  const [isConfirmationSent, setIsConfirmationSent] = useState(false)

  // 📥 Handle email/password login or signup
  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setIsConfirmationSent(false)

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (isSignUp && !error) {
      setIsConfirmationSent(true)
    } else if (error) {
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
      className="w-full max-w-sm mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 🔲 Auth card container */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        variants={itemVariants}
      >
        {/* 🧢 App title */}
        <motion.h1
          className="text-2xl font-bold text-center text-blue-600"
          variants={itemVariants}
        >
          Lost & Found
        </motion.h1>

        {/* 🪪 Login or signup prompt */}
        <motion.h2
          className="text-lg text-gray-600 text-center"
          key={isSignUp ? 'signup' : 'login'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </motion.h2>

        {/* 📧 Email/Password Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <motion.div variants={itemVariants}>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          {/* 🧨 Error or confirmation messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
            {isConfirmationSent && (
              <motion.p
                key="confirmation"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-500 text-sm text-center"
              >
                A confirmation email has been sent! Please check your inbox.
              </motion.p>
            )}
          </AnimatePresence>

          {/* 🔘 Main auth button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full py-3 rounded-xl text-white font-medium ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </motion.button>

          {/* 🟩 Google login button */}
          <motion.button
            onClick={handleGoogleLogin}
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full py-3 flex items-center justify-center gap-2 mt-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium"
          >
            <FcGoogle size={20} />
            Continue with Google
          </motion.button>
        </form>

        {/* 🔁 Toggle login/signup */}
        <motion.div
          className="text-center text-sm text-gray-600"
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
