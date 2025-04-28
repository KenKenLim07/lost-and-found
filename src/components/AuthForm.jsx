import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmationSent, setIsConfirmationSent] = useState(false) // New state for confirmation message

  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setIsConfirmationSent(false) // Reset confirmation message on each attempt

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (isSignUp && !error) {
      setIsConfirmationSent(true) // Show confirmation message if sign-up is successful
    } else if (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  }

  return (
    <motion.div 
      className="w-full max-w-sm mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-2xl font-bold text-center text-blue-600"
          variants={itemVariants}
        >
          Lost & Found
        </motion.h1>

        <motion.h2 
          className="text-lg text-gray-600 text-center"
          key={isSignUp ? 'signup' : 'login'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </motion.h2>

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

          <motion.button
            variants={itemVariants}
            className={`w-full py-3 rounded-xl text-white font-medium transition-all ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              isSignUp ? 'Sign Up' : 'Log In'
            )}
          </motion.button>
        </form>

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
