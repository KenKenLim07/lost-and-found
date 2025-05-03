import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { Eye, EyeOff } from 'lucide-react'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Auto-focus email input on mount
  useEffect(() => {
    document.getElementById('auth-email')?.focus()
  }, [])

  // Auth handlers
  const signUp = async () => await supabase.auth.signUp({ email, password })
  const login = async () => await supabase.auth.signInWithPassword({ email, password })

  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const { error } = isSignUp ? await signUp() : await login()
    if (error) setError(error.message)

    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) setError(error.message)
  }

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-sm space-y-6"
        variants={itemVariants}
      >
        {/* Header */}
        <motion.div className="text-center space-y-2" variants={itemVariants}>
          <div className="space-y-0.5">
            <h1 className="text-sm text-gray-500 font-medium">Hello</h1>
            <h2 className="text-3xl font-bold text-blue-600 tracking-wide">Mosquedians!</h2>
          </div>
          <p className="text-base text-gray-800">
            <span className="opacity-60">Lost</span> or <span className="font-bold">found</span> something?
          </p>
          <p className="text-xs text-gray-500 italic">Congrats! "New Side Quest unlocked: return it."</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <motion.div variants={itemVariants}>
            <input
              id="auth-email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-base font-medium"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </motion.div>

          <motion.div className="relative" variants={itemVariants}>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-base font-medium pr-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
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
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </motion.button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Auth */}
          <motion.button
            onClick={handleGoogleLogin}
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold shadow-sm"
          >
            <FcGoogle size={20} />
            Continue with Google
          </motion.button>
        </form>

        {/* Toggle Signup/Login */}
        <motion.div className="text-center text-sm text-gray-600" variants={itemVariants}>
          <button onClick={() => setIsSignUp(!isSignUp)} className="transition-colors">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <span className="text-blue-600 font-semibold hover:underline">Log in</span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <span className="text-blue-600 font-semibold hover:underline">Sign up</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
