import { useCV } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AITextInput from "@/components/ui/ai-text-input";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateCV, resendEmailVerification } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function PersonalInfoSection() {
  const { mainCV, setMainCV } = useCV();
  const { toast } = useToast();
  const [showEmailChangeDialog, setShowEmailChangeDialog] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [emailInputValue, setEmailInputValue] = useState(mainCV?.personalInfo.email ?? "");

  if (!mainCV) return null;

  // Check if this is an existing CV (has a valid MongoDB ObjectId)
  const isExistingCV = Boolean(mainCV.id && mainCV.id.length === 24 && /^[a-f0-9]+$/.test(mainCV.id));

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(e.target.value);
  };

  const handleEmailBlur = () => {
    const newEmail = emailInputValue.trim();
    if (isExistingCV && mainCV.personalInfo.email && newEmail !== mainCV.personalInfo.email) {
      setPendingEmail(newEmail);
      setOriginalEmail(mainCV.personalInfo.email);
      setShowEmailChangeDialog(true);
    } else {
      setMainCV({
        ...mainCV,
        personalInfo: { ...mainCV.personalInfo, email: newEmail },
        lastUpdated: new Date(),
      });
    }
  };

  const confirmEmailChange = async () => {
    try {
      // Update the email in state
      setMainCV({
        ...mainCV,
        personalInfo: { ...mainCV.personalInfo, email: pendingEmail },
        isEmailVerified: false,
        lastUpdated: new Date(),
      });

      // Update CV in backend
      if (mainCV.id) {
        await updateCV(mainCV.id, {
          data: {
            basics: {
              ...mainCV.personalInfo,
              name: mainCV.personalInfo.fullName,
              email: pendingEmail,
            }
          }
        });

        // Send verification email
        try {
          await resendEmailVerification(mainCV.id);
          toast({
            title: "Email Updated",
            description: "A verification email has been sent to your new email address.",
          });
        } catch (error) {
          toast({
            title: "Email Updated",
            description: "Email updated but verification email failed to send. You can resend it from the banner above.",
            variant: "destructive",
          });
        }
      }

      setShowEmailChangeDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cancelEmailChange = () => {
    setShowEmailChangeDialog(false);
    setEmailInputValue(originalEmail);
    setPendingEmail("");
    setOriginalEmail("");
  };

  const updatePersonalInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const updates: any = {
      personalInfo: { ...mainCV.personalInfo, [name]: value },
      lastUpdated: new Date(),
    };
    
    // Auto-update CV title when full name changes and title is still "Untitled CV"
    if (name === 'fullName' && value && mainCV.title === 'Untitled CV') {
      updates.title = `${value}'s CV`;
    }
    
    setMainCV({
      ...mainCV,
      ...updates,
    });
  };

  return (
    <>
      <div className="mb-3 md:mb-5">
        <h2 className="text-base md:text-lg font-medium mb-2 md:mb-4">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
            <Input 
              type="text" 
              name="fullName" 
              value={mainCV.personalInfo.fullName} 
              onChange={updatePersonalInfo} 
              disabled={isExistingCV}
              className={`w-full h-9 focus-visible:ring-[#DAA520] ${isExistingCV ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {isExistingCV && (
              <p className="text-xs text-gray-500 mt-1">Name cannot be edited for imported CVs</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Professional Title</label>
            <Input type="text" name="title" value={mainCV.personalInfo.title} onChange={updatePersonalInfo} className="w-full h-9 focus-visible:ring-[#DAA520]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <Input 
              type="email" 
              name="email" 
              value={emailInputValue} 
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className="w-full h-9 focus-visible:ring-[#DAA520]"
            />
            {isExistingCV && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Changing email requires verification
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
            <Input type="tel" name="phone" value={mainCV.personalInfo.phone} onChange={updatePersonalInfo} className="w-full h-9 focus-visible:ring-[#DAA520]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
            <Input type="text" name="location" value={mainCV.personalInfo.location} onChange={updatePersonalInfo} className="w-full h-9 focus-visible:ring-[#DAA520]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Website URL (Optional)</label>
            <Input type="url" name="url" value={mainCV.personalInfo.url || ""} onChange={updatePersonalInfo} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Professional Summary</label>
            <AITextInput
              variant="textarea"
              name="summary"
              value={mainCV.personalInfo.summary}
              onChange={updatePersonalInfo}
              onValueChange={(val) => setMainCV({ ...mainCV, personalInfo: { ...mainCV.personalInfo, summary: val }, lastUpdated: new Date() })}
              className="w-full min-h-[100px] focus-visible:ring-[#DAA520]"
              placeholder="Brief overview of your professional background..."
            />
          </div>
        </div>
      </div>

      {/* Email Change Confirmation Dialog */}
      <AlertDialog open={showEmailChangeDialog} onOpenChange={setShowEmailChangeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verify Email Change
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>You're changing your CV email address:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">From:</span>
                  <span className="text-sm font-medium text-gray-700">{originalEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">To:</span>
                  <span className="text-sm font-medium text-[#DAA520]">{pendingEmail}</span>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> A verification email will be sent to <strong>{pendingEmail}</strong>. 
                  You must verify this email before you can download your CV.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelEmailChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmEmailChange}
              className="bg-[#DAA520] hover:bg-[#B8860B] text-white"
            >
              Change & Verify Email
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
