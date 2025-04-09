import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import { useFormState } from "@/lib/hooks";

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
      <div className="text-center mb-8">
        <Link href="/">
          <a className="text-3xl font-bold cursor-pointer">
            <span className="text-black">CV</span><span className="text-[#DAA520]">Cat</span>
          </a>
        </Link>
        <h2 className="text-2xl font-bold mt-6 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to continue to your account</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Auth Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`flex-1 py-3 font-medium text-center border-b-2 ${isSignIn ? 'border-black' : 'border-transparent text-gray-500'}`}
            onClick={() => toggleAuthTab('signin')}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-center border-b-2 ${!isSignIn ? 'border-black' : 'border-transparent text-gray-500'}`}
            onClick={() => toggleAuthTab('signup')}
          >
            Sign Up
          </button>
        </div>
        
        {/* Sign In Form */}
        {isSignIn ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={signInData.email}
                onChange={handleSignInChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                value={signInData.password}
                onChange={handleSignInChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Checkbox id="remember" className="h-4 w-4 text-[#DAA520] focus:ring-[#DAA520] border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-[#DAA520] hover:underline">Forgot password?</a>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-[#DAA520] transition-all"
            >
              Sign In
            </Button>
            
            <div className="relative flex items-center justify-center my-6">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-3 text-sm text-gray-500">Or continue with</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
              >
                <i className="fab fa-google mr-2"></i>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
              >
                <i className="fab fa-github mr-2"></i>
                GitHub
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                type="text"
                id="signup-name"
                name="name"
                value={signUpData.name}
                onChange={handleSignUpChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
              />
            </div>
            
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                id="signup-email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
              />
            </div>
            
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                id="signup-password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
              />
            </div>
            
            <div className="flex items-start">
              <Checkbox id="terms" className="h-4 w-4 mt-1 text-[#DAA520] focus:ring-[#DAA520] border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the <a href="#" className="text-[#DAA520] hover:underline">Terms of Service</a> and <a href="#" className="text-[#DAA520] hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-[#DAA520] transition-all"
            >
              Create Account
            </Button>
            
            <div className="relative flex items-center justify-center my-6">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-3 text-sm text-gray-500">Or sign up with</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
              >
                <i className="fab fa-google mr-2"></i>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
              >
                <i className="fab fa-github mr-2"></i>
                GitHub
              </Button>
            </div>
          </form>
        )}
      </div>
      
      <div className="text-center mt-6">
        <Link href="/">
          <a className="text-gray-600 hover:text-[#DAA520] transition-all">
            <i className="fas fa-arrow-left mr-2"></i> Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
