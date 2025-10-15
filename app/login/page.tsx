'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Meteors } from '../../components/ui/meteors';
import { Vortex } from '../../components/ui/vortex';
import { useAuth } from '../../lib/AuthContext';

// --- Reusable UI Components ---

// A consistent input field component
const FormInput = ({ id, name, type, placeholder, value, onChange }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {placeholder}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={name}
      required
      className="w-full px-3 py-2 text-white bg-gray-800 placeholder-gray-500 border border-gray-700 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 focus:border-cyan-500"
      placeholder={`Enter your ${placeholder.toLowerCase()}`}
    />
  </div>
);

// A submit button that shows a loading state
const SubmitButton = ({ isLoading, children }: any) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center"
  >
    {isLoading ? (
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ) : (
      children
    )}
  </button>
);

// A container for the sign-in/sign-up form with animation
const AuthForm = ({ isNewUser, onSubmit, isLoading }: any) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      key={isNewUser ? 'signup' : 'signin'}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
      onSubmit={(e) => onSubmit(e, formData)}
    >
      <FormInput id="email" name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
      <FormInput id="password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      {isNewUser && (
        <FormInput id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
      )}
      <SubmitButton isLoading={isLoading}>{isNewUser ? 'Sign Up' : 'Sign In'}</SubmitButton>
    </motion.form>
  );
};


// --- Main Login Page Component ---

export default function LoginPage() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleAuthSubmit = (e: React.FormEvent, formData: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (isNewUser && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form data submitted:', formData);
      login();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="mx-auto w-full h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
    
        particleCount={500}
        containerClassName="flex items-center justify-center w-full h-full"
      >
        <div className="relative w-full max-w-md p-8 space-y-6 bg-gray-900/[0.6] border border-gray-700 rounded-2xl shadow-lg backdrop-blur-sm overflow-hidden">
          <Meteors number={20} />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">The Symposia</h1>
            <p className="mt-2 text-sm text-gray-300">
              {isNewUser
                ? 'Create a new account to begin'
                : 'Welcome back! Please sign in.'}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            <AuthForm key={isNewUser ? 'signup' : 'signin'} isNewUser={isNewUser} onSubmit={handleAuthSubmit} isLoading={isLoading} />
          </AnimatePresence>

          <div className="text-sm text-center">
            <button
              onClick={() => setIsNewUser(!isNewUser)}
              className="font-medium text-cyan-400 hover:text-cyan-300"
              disabled={isLoading}
            >
              {isNewUser
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </Vortex>
    </div>
  );
}

