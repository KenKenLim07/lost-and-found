// src/components/AuthForm.jsx
import { useState } from 'react'
import { supabase } from '../lib/supabase'
export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
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
    <form onSubmit={handleAuth} className="space-y-4">
      <h2 className="text-xl font-bold">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
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
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        {isSignUp ? 'Sign Up' : 'Log In'}
      </button>
      <p
        className="text-sm text-gray-600 cursor-pointer"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </p>
    </form>
  )
}
