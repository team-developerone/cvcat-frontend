import { useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { useCV } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CV } from "@/lib/types";
import { LucideArrowRight, LucideArrowLeft, LucideCheckCircle2, LucideX } from "lucide-react";

export default function TailorCVWizard() {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");
  const [keySkills, setKeySkills] = useState("");
  const [keyStrengths, setKeyStrengths] = useState("");
  const [customSections, setCustomSections] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cvToTailor, setCvToTailor] = useState<string | null>(null);
  const [includeSkills, setIncludeSkills] = useState(true);
  const [includeExperience, setIncludeExperience] = useState(true);
  const [includeEducation, setIncludeEducation] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  
  const { mainCV, tailoredCVs, setTailoredCVs, setCurrentCV } = useCV();
  const [, navigate] = useLocation();
  
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleGenerateTailoredCV = () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      if (mainCV) {
        // Create a new tailored CV based on the mainCV
        const newTailoredCV: CV = {
          ...mainCV,
          id: `tailored-${Date.now()}`,
          title: `${mainCV.title} for ${companyName}`,
          description: `Tailored for ${jobTitle} position at ${companyName}`,
          forJob: jobTitle,
          isTailored: true,
          lastUpdated: new Date()
        };
        
        // Add to tailored CVs
        setTailoredCVs([...tailoredCVs, newTailoredCV]);
        // Set as current CV
        setCurrentCV(newTailoredCV);
        
        // Navigate to CV builder with the new tailored CV
        navigate("/cv-builder");
      }
      
      setIsProcessing(false);
    }, 2000); // Simulate AI processing time
  };
  
  return (
    <Layout isAuthenticated={true}>
      <div className="container max-w-4xl py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Tailored CV</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-[#DAA520]"
            initial={{ width: `${(step / 5) * 100 - 5}%` }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <Card className="border-2 shadow-md">
          {/* Step 1: Select CV to Tailor */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Choose Your Base CV</CardTitle>
                <CardDescription>
                  Select the CV you want to tailor for this job application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mainCV && (
                    <div 
                      className={`p-4 border-2 rounded-lg ${cvToTailor === mainCV.id ? 'border-[#DAA520] bg-[#DAA520]/5' : 'border-gray-200'} cursor-pointer transition-all hover:border-[#DAA520]/50`}
                      onClick={() => setCvToTailor(mainCV.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{mainCV.title || 'Main CV'}</h3>
                          <p className="text-sm text-gray-500">Last updated: {mainCV.lastUpdated.toLocaleDateString()}</p>
                        </div>
                        {cvToTailor === mainCV.id ? (
                          <div className="h-6 w-6 rounded-full bg-[#DAA520] flex items-center justify-center text-white">
                            <LucideCheckCircle2 className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                    </div>
                  )}
                  
                  {tailoredCVs.map((cv) => (
                    <div 
                      key={cv.id} 
                      className={`p-4 border-2 rounded-lg ${cvToTailor === cv.id ? 'border-[#DAA520] bg-[#DAA520]/5' : 'border-gray-200'} cursor-pointer transition-all hover:border-[#DAA520]/50`}
                      onClick={() => setCvToTailor(cv.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{cv.title}</h3>
                          <p className="text-sm text-gray-500">Last updated: {cv.lastUpdated.toLocaleDateString()}</p>
                          {cv.forJob && (
                            <p className="text-xs text-[#DAA520]">Tailored for: {cv.forJob}</p>
                          )}
                        </div>
                        {cvToTailor === cv.id ? (
                          <div className="h-6 w-6 rounded-full bg-[#DAA520] flex items-center justify-center text-white">
                            <LucideCheckCircle2 className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {!mainCV && tailoredCVs.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      You don't have any CVs yet. Please create a CV first.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/cv-management")}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!cvToTailor}
                  className="bg-black text-white hover:bg-black/80"
                >
                  Next <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}
          
          {/* Step 2: Job Details */}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Job Details</CardTitle>
                <CardDescription>
                  Enter information about the position you're applying for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Product Manager"
                      className="border-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job description here..."
                      rows={5}
                      className="border-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      For best results, include the full job description with responsibilities and requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={handlePrevious}>
                  <LucideArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!jobTitle || !jobDescription}
                  className="bg-black text-white hover:bg-black/80"
                >
                  Next <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}
          
          {/* Step 3: Company Information */}
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Company Information</CardTitle>
                <CardDescription>
                  Tell us about the company you're applying to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Corporation"
                      className="border-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="companyInfo">Company Information (Optional)</Label>
                    <Textarea
                      id="companyInfo"
                      value={companyInfo}
                      onChange={(e) => setCompanyInfo(e.target.value)}
                      placeholder="Add any details about the company, culture, mission, etc."
                      rows={3}
                      className="border-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Adding company information helps our AI tailor your CV to match their values.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={handlePrevious}>
                  <LucideArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!companyName}
                  className="bg-black text-white hover:bg-black/80"
                >
                  Next <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}
          
          {/* Step 4: Key Skills & Experience */}
          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Key Skills & Strengths</CardTitle>
                <CardDescription>
                  Highlight specific skills and strengths for this role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="keySkills">Key Skills for This Role</Label>
                    <Textarea
                      id="keySkills"
                      value={keySkills}
                      onChange={(e) => setKeySkills(e.target.value)}
                      placeholder="e.g. Project Management, Agile, Stakeholder Management"
                      rows={3}
                      className="border-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate each skill with a comma
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="keyStrengths">Your Key Strengths (Optional)</Label>
                    <Textarea
                      id="keyStrengths"
                      value={keyStrengths}
                      onChange={(e) => setKeyStrengths(e.target.value)}
                      placeholder="e.g. Leadership, Problem Solving, Communication"
                      rows={3}
                      className="border-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      What personal qualities make you right for this role?
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={handlePrevious}>
                  <LucideArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-black text-white hover:bg-black/80"
                >
                  Next <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}
          
          {/* Step 5: Customization Options */}
          {step === 5 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Customization Options</CardTitle>
                <CardDescription>
                  Select which parts of your CV you want to tailor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeSummary" 
                      checked={includeSummary}
                      onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
                    />
                    <Label htmlFor="includeSummary" className="font-medium">
                      Tailor Professional Summary
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeSkills" 
                      checked={includeSkills}
                      onCheckedChange={(checked) => setIncludeSkills(checked as boolean)}
                    />
                    <Label htmlFor="includeSkills" className="font-medium">
                      Tailor Skills Section
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeExperience" 
                      checked={includeExperience}
                      onCheckedChange={(checked) => setIncludeExperience(checked as boolean)}
                    />
                    <Label htmlFor="includeExperience" className="font-medium">
                      Tailor Work Experience Descriptions
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeEducation" 
                      checked={includeEducation}
                      onCheckedChange={(checked) => setIncludeEducation(checked as boolean)}
                    />
                    <Label htmlFor="includeEducation" className="font-medium">
                      Tailor Education Section
                    </Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="customSections">Custom Sections (Optional)</Label>
                    <Textarea
                      id="customSections"
                      value={customSections}
                      onChange={(e) => setCustomSections(e.target.value)}
                      placeholder="Add any specific sections you'd like to include or customize"
                      rows={2}
                      className="border-2"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={handlePrevious}>
                  <LucideArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleGenerateTailoredCV}
                  disabled={isProcessing}
                  className="bg-black text-white hover:bg-black/80"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Create Tailored CV</>
                  )}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
        
        {/* Tailoring Tips */}
        <div className="mt-8 bg-[#DAA520]/10 border border-[#DAA520]/20 rounded-lg p-4">
          <h3 className="font-medium mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#DAA520]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tailoring Tips
          </h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#DAA520] mr-2">•</span>
              Focus on achievements relevant to the job description
            </li>
            <li className="flex items-start">
              <span className="text-[#DAA520] mr-2">•</span>
              Use keywords from the job posting to improve your chances
            </li>
            <li className="flex items-start">
              <span className="text-[#DAA520] mr-2">•</span>
              Quantify your achievements with numbers when possible
            </li>
            <li className="flex items-start">
              <span className="text-[#DAA520] mr-2">•</span>
              Align your skills and experience with the company's values
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}