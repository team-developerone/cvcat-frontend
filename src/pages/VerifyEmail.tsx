import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "already_verified" | "error">("loading");
  const [message, setMessage] = useState("");
  const [cvTitle, setCvTitle] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      // Get query parameters
      const params = new URLSearchParams(window.location.search);
      const cvid = params.get("cvid");
      const token = params.get("token");

      if (!cvid || !token) {
        setStatus("error");
        setMessage("Invalid verification link. Missing required parameters.");
        return;
      }

      try {
        // Call the backend API with format=json
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://cvcat-api-dev-phhm2.ondigitalocean.app/api/v1";
        const url = `${API_BASE_URL}/cv/verify-email/confirm?cvid=${encodeURIComponent(cvid)}&token=${encodeURIComponent(token)}&format=json`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.error) {
          setStatus("error");
          setMessage(data.reason || "Verification failed. Please try again.");
        } else {
          // Check the signal to determine the exact status
          if (data.data?.signal === "already_verified") {
            setStatus("already_verified");
            setMessage(data.message || "This email has already been verified.");
          } else {
            setStatus("success");
            setMessage(data.message || "Email verified successfully!");
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("Failed to verify email. Please check your connection and try again.");
      }
    };

    verifyEmail();
  }, []);

  const handleGoToCVs = () => {
    navigate("/cv-management");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Status Icon */}
            <div className="p-8 text-center">
              {status === "loading" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <div className="w-20 h-20 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 text-[#DAA520]" />
                  </div>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                </motion.div>
              )}

              {status === "already_verified" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-blue-600" />
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                </motion.div>
              )}

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {status === "loading" && "Verifying Email..."}
                {status === "success" && "Email Verified!"}
                {status === "already_verified" && "Already Verified"}
                {status === "error" && "Verification Failed"}
              </h1>

              {/* Message */}
              <p className="text-gray-600 mb-6">
                {status === "loading" && "Please wait while we verify your email address."}
                {status === "success" && "Your CV email has been successfully verified. You can now download and share your CV."}
                {status === "already_verified" && "This email address has already been verified. No further action is needed."}
                {status === "error" && message}
              </p>

              {/* Additional Info for Success/Already Verified */}
              {(status === "success" || status === "already_verified") && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-800">
                      <p className="font-semibold mb-1">What's next?</p>
                      <ul className="space-y-1 text-green-700">
                        <li>• Access your CV dashboard</li>
                        <li>• Download your CV as PDF</li>
                        <li>• Share your professional CV</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Details */}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <p className="font-semibold mb-1">Common issues:</p>
                      <ul className="space-y-1 text-red-700">
                        <li>• The verification link may have expired</li>
                        <li>• The link may have been used already</li>
                        <li>• The link may be incomplete or corrupted</li>
                      </ul>
                      <p className="mt-2">Please request a new verification email from your CV dashboard.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {status !== "loading" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={handleGoToCVs}
                    className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-white font-semibold py-6 text-base rounded-lg shadow-md transition-all"
                  >
                    Go to My CVs
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-8 py-4">
              <p className="text-xs text-center text-gray-500">
                Need help? Contact us at{" "}
                <a href="mailto:support@cvcat.io" className="text-[#DAA520] hover:underline">
                  support@cvcat.io
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
