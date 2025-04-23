// src/components/AuthForm.jsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) setError(error.message)
    else alert('Success! Check console or redirect logic.')
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-extrabold text-center text-blue-600 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Lost and Found
      </motion.h1>

      <form onSubmit={handleAuth} className="space-y-4">
        <h2 className="text-xl font-bold text-center">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </h2>
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>

        {/* Enhanced toggle link */}
        <p
          className="text-sm font-medium text-blue-600 text-center cursor-pointer hover:underline mt-4"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? 'Already have an account? Log in'
            : "New here? Create an account"}
        </p>
      </form>
    </div>
  )
}
