import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import { useFormState } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";
import LogoMinimal from "@/components/LogoMinimal";

interface AuthFormsProps {
  onLoginSuccess: () => void;
}

export default function AuthForms({ onLoginSuccess }: AuthFormsProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [, navigate] = useLocation();
  
  // Form states
  const { formData: signInData, handleChange: handleSignInChange } = useFormState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const { formData: signUpData, handleChange: handleSignUpChange } = useFormState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false
  });
  
  // Toggle between Sign In and Sign Up tabs
  const toggleAuthTab = (tab: 'signin' | 'signup') => {
    setIsSignIn(tab === 'signin');
  };
  
  // Handle form submission (just navigate to next screen for prototype)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };
  
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8 lg:hidden">
        <Link href="/">
          <a className="inline-block">
            <LogoMinimal size="md" />
          </a>
        </Link>
        <h2 className="text-2xl font-bold mt-6 mb-2">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-600">
          {isSignIn ? "Sign in to continue to your account" : "Get started with your CVCat journey"}
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
        {/* Auth Tabs */}
        <div className="flex border-b border-gray-100 mb-6">
          <button 
            className={`flex-1 py-3 font-medium text-center border-b-2 transition-all duration-300 ${
              isSignIn ? 'border-[#DAA520] text-black' : 'border-transparent text-gray-400'
            }`}
            onClick={() => toggleAuthTab('signin')}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-center border-b-2 transition-all duration-300 ${
              !isSignIn ? 'border-[#DAA520] text-black' : 'border-transparent text-gray-400'
            }`}
            onClick={() => toggleAuthTab('signup')}
          >
            Sign Up
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {/* Sign In Form */}
          {isSignIn ? (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/30 focus:border-[#DAA520]"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs text-[#DAA520] hover:underline">Forgot password?</a>
                </div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/30 focus:border-[#DAA520]"
                />
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="remember" 
                  className="h-4 w-4 text-[#DAA520] focus:ring-[#DAA520] border-gray-300 rounded" 
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              
              <Button 
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-[#DAA520] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Sign In
              </Button>
              
              <div className="relative flex items-center justify-center my-6">
                <hr className="w-full border-gray-200" />
                <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">Or continue with</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub
                </Button>
              </div>
              
              <div className="text-center text-sm mt-6 text-gray-500">
                Don't have an account?{" "}
                <button 
                  type="button"
                  onClick={() => toggleAuthTab('signup')} 
                  className="text-[#DAA520] hover:underline font-medium"
                >
                  Sign up
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                <Input
                  type="text"
                  id="signup-name"
                  name="name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/30 focus:border-[#DAA520]"
                />
              </div>
              
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <Input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/30 focus:border-[#DAA520]"
                />
              </div>
              
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                <Input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/30 focus:border-[#DAA520]"
                />
              </div>
              
              <div className="flex items-start">
                <Checkbox 
                  id="terms" 
                  className="h-4 w-4 mt-1 text-[#DAA520] focus:ring-[#DAA520] border-gray-300 rounded" 
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-[#DAA520] hover:underline">Terms of Service</a> and <a href="#" className="text-[#DAA520] hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <Button 
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-[#DAA520] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Create Account
              </Button>
              
              <div className="relative flex items-center justify-center my-6">
                <hr className="w-full border-gray-200" />
                <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">Or sign up with</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub
                </Button>
              </div>
              
              <div className="text-center text-sm mt-6 text-gray-500">
                Already have an account?{" "}
                <button 
                  type="button"
                  onClick={() => toggleAuthTab('signin')} 
                  className="text-[#DAA520] hover:underline font-medium"
                >
                  Sign in
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      
      <div className="text-center mt-6">
        <Link href="/">
          <a className="inline-flex items-center text-sm text-gray-500 hover:text-[#DAA520] transition-all">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
