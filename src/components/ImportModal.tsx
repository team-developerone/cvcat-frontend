import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth-context";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File, email: string) => void;
}

export default function ImportModal({ isOpen, onClose, onFileSelect }: ImportModalProps) {
  const { user } = useAuth();
  const [emailOption, setEmailOption] = useState<"login" | "custom">("login");
  const [customEmail, setCustomEmail] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    
    if (!validTypes.includes(file.type)) {
      setError("Please upload only PDF or DOCX files");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError("File size must be less than 10MB");
      return false;
    }

    setError("");
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleProceed = () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    const email = emailOption === "login" ? user?.email || "" : customEmail;
    
    if (emailOption === "custom" && !customEmail) {
      setError("Please enter a custom email address");
      return;
    }

    if (emailOption === "custom" && !isValidEmail(customEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    onFileSelect(selectedFile, email);
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setError("");
    setEmailOption("login");
    setCustomEmail("");
    onClose();
  };

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return (
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <FileText className="w-6 h-6 text-red-500" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <FileText className="w-6 h-6 text-blue-500" />
      </div>
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="border-b border-gray-200 p-6 pb-4">
          <DialogTitle className="text-xl font-bold">Import Your CV</DialogTitle>
          <DialogDescription>
            Confirm your email and upload your resume to get started
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Pane - Email Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Confirm Email Address</h3>
              <p className="text-xs text-gray-500 mb-4">
                This email will be displayed on your CV
              </p>
            </div>

            <RadioGroup value={emailOption} onValueChange={(value) => setEmailOption(value as "login" | "custom")}>
              <div className="space-y-3">
                {/* Login Email Option */}
                <div
                  className={cn(
                    "flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                    emailOption === "login"
                      ? "border-[#DAA520] bg-[#DAA520]/5"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setEmailOption("login")}
                >
                  <RadioGroupItem value="login" id="login" className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor="login" className="font-medium cursor-pointer flex items-center gap-2">
                      Use Login Email
                      {emailOption === "login" && (
                        <CheckCircle2 className="w-4 h-4 text-[#DAA520]" />
                      )}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1 break-all">
                      {user?.email || "your-email@example.com"}
                    </p>
                  </div>
                </div>

                {/* Custom Email Option */}
                <div
                  className={cn(
                    "flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                    emailOption === "custom"
                      ? "border-[#DAA520] bg-[#DAA520]/5"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setEmailOption("custom")}
                >
                  <RadioGroupItem value="custom" id="custom" className="mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="custom" className="font-medium cursor-pointer flex items-center gap-2">
                      Use Custom Email
                      {emailOption === "custom" && (
                        <CheckCircle2 className="w-4 h-4 text-[#DAA520]" />
                      )}
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter custom email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      disabled={emailOption !== "custom"}
                      className="w-full"
                    />
                    {emailOption === "custom" && (
                      <p className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        This email will need to be verified
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Right Pane - File Upload */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Upload Resume</h3>
              <p className="text-xs text-gray-500 mb-4">
                PDF or DOCX format only (Max 10MB)
              </p>
            </div>

            {!selectedFile ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
                  dragActive
                    ? "border-[#DAA520] bg-[#DAA520]/5"
                    : "border-gray-300 hover:border-[#DAA520] hover:bg-gray-50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-[#DAA520]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports PDF and DOCX files
                    </p>
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="border-2 border-[#DAA520] rounded-lg p-4 bg-[#DAA520]/5">
                <div className="flex items-start gap-3">
                  {getFileIcon(selectedFile)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setError("");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with actions */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            disabled={!selectedFile}
            className="bg-[#DAA520] hover:bg-[#B8860B] text-white"
          >
            Proceed with Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
