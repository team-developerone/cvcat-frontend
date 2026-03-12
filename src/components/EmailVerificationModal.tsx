import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Mail, ShieldCheck, Edit2 } from "lucide-react";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
  email: string;
}

export default function EmailVerificationModal({
  isOpen,
  onClose,
  onConfirm,
  email,
}: EmailVerificationModalProps) {
  const [editedEmail, setEditedEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEditedEmail(email);
      setIsEditing(false);
      setError("");
    }
  }, [isOpen, email]);

  const isValidEmail = (emailToCheck: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToCheck);
  };

  const handleConfirm = () => {
    // Validate email
    if (!editedEmail || !editedEmail.trim()) {
      setError("Email address is required");
      return;
    }

    if (!isValidEmail(editedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    onConfirm(editedEmail);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
              <Mail className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Email Verification Required</DialogTitle>
          <DialogDescription className="text-center">
            Please review the important information about your CV email
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Email Display/Edit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cv-email" className="text-sm font-medium text-gray-900">
                Your CV Email
              </Label>
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="h-7 px-2 text-xs text-[#DAA520] hover:text-[#B8860B] hover:bg-[#DAA520]/10"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  id="cv-email"
                  type="email"
                  value={editedEmail}
                  onChange={(e) => {
                    setEditedEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter email address"
                  className="w-full"
                  autoFocus
                />
                {error && (
                  <div className="flex items-start gap-2 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditedEmail(email);
                      setIsEditing(false);
                      setError("");
                    }}
                    className="h-8 px-3 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (editedEmail && isValidEmail(editedEmail)) {
                        setIsEditing(false);
                        setError("");
                      } else {
                        setError("Please enter a valid email address");
                      }
                    }}
                    className="h-8 px-3 text-xs bg-[#DAA520] hover:bg-[#B8860B] text-white"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 break-all">{editedEmail}</p>
              </div>
            )}
          </div>

          {/* Important Points */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Verification Email</p>
                <p className="text-xs text-gray-600">
                  A verification link will be sent to this email address
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Cannot Be Changed</p>
                <p className="text-xs text-gray-600">
                  Once your CV is created, the email address cannot be modified
                </p>
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> Make sure this is the correct email address. You'll need to
              verify it to activate your CV.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isEditing}
            className="bg-[#DAA520] hover:bg-[#B8860B] text-white w-full sm:w-auto disabled:opacity-50"
          >
            Confirm & Create CV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
