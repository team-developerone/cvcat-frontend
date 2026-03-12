import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Mail, X, Edit2, Check } from "lucide-react";
import { resendEmailVerification, updateCV } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface EmailVerificationBannerProps {
  cvId: string;
  currentEmail: string;
  onEmailUpdated: (newEmail: string) => void;
  onVerificationSent: () => void;
}

export default function EmailVerificationBanner({
  cvId,
  currentEmail,
  onEmailUpdated,
  onVerificationSent,
}: EmailVerificationBannerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(currentEmail);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const response = await resendEmailVerification(cvId);
      
      if (response.data.signal === "already_verified") {
        toast({ 
          title: "Already Verified", 
          description: "This email is already verified!" 
        });
        onVerificationSent();
      } else if (response.data.signal === "auto_verified") {
        toast({ 
          title: "Auto-Verified", 
          description: "Email matches your account and has been verified!" 
        });
        onVerificationSent();
      } else {
        toast({ 
          title: "Verification Email Sent", 
          description: "Please check your inbox and click the verification link." 
        });
        onVerificationSent();
      }
    } catch (err) {
      toast({
        title: "Failed to Send",
        description: err instanceof Error ? err.message : "Could not send verification email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!editedEmail || !editedEmail.trim()) {
      setError("Email address is required");
      return;
    }

    if (!isValidEmail(editedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await updateCV(cvId, {
        data: {
          basics: {
            email: editedEmail,
          },
        },
      } as any);

      toast({ 
        title: "Email Updated", 
        description: "Your CV email has been updated. Please verify it." 
      });
      
      onEmailUpdated(editedEmail);
      setIsEditing(false);
      setError("");
    } catch (err) {
      toast({
        title: "Update Failed",
        description: err instanceof Error ? err.message : "Could not update email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="sticky top-0 z-40 bg-amber-50 border-b-2 border-amber-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-900 mb-1">
                    Email Verification Required
                  </h3>
                  
                  {!isEditing ? (
                    <div className="space-y-2">
                      <p className="text-sm text-amber-800">
                        Your CV email <span className="font-medium">{currentEmail}</span> needs to be verified before you can download your CV.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={handleResendVerification}
                          disabled={isLoading}
                          className="h-8 bg-amber-600 hover:bg-amber-700 text-white text-xs"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Mail className="w-3 h-3 mr-1" />
                              Resend Verification
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditedEmail(currentEmail);
                            setIsEditing(true);
                            setError("");
                          }}
                          disabled={isLoading}
                          className="h-8 text-xs border-amber-300 text-amber-800 hover:bg-amber-100"
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          Edit Email
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start max-w-md">
                        <div className="flex-1">
                          <Input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => {
                              setEditedEmail(e.target.value);
                              setError("");
                            }}
                            placeholder="Enter new email"
                            className="h-8 text-sm"
                            disabled={isLoading}
                          />
                          {error && (
                            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {error}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={handleSaveEmail}
                            disabled={isLoading || editedEmail === currentEmail}
                            className="h-8 px-2 bg-amber-600 hover:bg-amber-700 text-white"
                          >
                            {isLoading ? (
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false);
                              setEditedEmail(currentEmail);
                              setError("");
                            }}
                            disabled={isLoading}
                            className="h-8 px-2 border-amber-300"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-amber-700">
                        After updating, you'll need to verify the new email address.
                      </p>
                    </div>
                  )}
                </div>

                {/* Dismiss Button */}
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDismissed(true)}
                  className="h-6 w-6 p-0 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                >
                  <X className="w-4 h-4" />
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
