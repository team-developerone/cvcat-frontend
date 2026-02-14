import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import LogoMinimal from "@/components/LogoMinimal";
import { useAuth } from "@/lib/auth-context";
import { fetchAllCVs } from "@/services/api";
import { toast } from "@/hooks/use-toast";

export default function AuthForms() {
  const [, navigate] = useLocation();
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { isFirstTime } = await signInWithGoogle();

      if (isFirstTime) {
        navigate("/import-selection");
        return;
      }

      // Check if returning user has CVs
      try {
        const res = await fetchAllCVs({ limit: 1 });
        if (res.data.length === 0) {
          navigate("/import-selection");
        } else {
          navigate("/cv-management");
        }
      } catch {
        navigate("/import-selection");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Sign-in failed. Please try again.";
      toast({
        title: "Sign-in failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8 lg:hidden">
        <Link href="/">
          <a className="inline-block">
            <LogoMinimal size="md" />
          </a>
        </Link>
        <h2 className="text-2xl font-bold mt-6 mb-2">Welcome</h2>
        <p className="text-gray-600">
          Sign in to continue to your account
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            Sign in to CVCat
          </h3>
          <p className="text-sm text-gray-500">
            Use your Google account to get started
          </p>
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 bg-black text-white rounded-lg hover:bg-[#DAA520] transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
          )}
          {isLoading ? "Signing in..." : "Continue with Google"}
        </Button>

        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#DAA520] hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-[#DAA520] hover:underline">Privacy Policy</a>
        </p>
      </motion.div>

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
