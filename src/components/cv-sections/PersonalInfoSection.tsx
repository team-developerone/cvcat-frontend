import { useCV } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AITextInput from "@/components/ui/ai-text-input";

export default function PersonalInfoSection() {
  const { mainCV, setMainCV } = useCV();

  if (!mainCV) return null;

  // Check if this is an existing CV (has a valid MongoDB ObjectId)
  const isExistingCV = Boolean(mainCV.id && mainCV.id.length === 24 && /^[a-f0-9]+$/.test(mainCV.id));

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
            value={mainCV.personalInfo.email} 
            onChange={updatePersonalInfo} 
            disabled={isExistingCV}
            className={`w-full h-9 focus-visible:ring-[#DAA520] ${isExistingCV ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {isExistingCV && (
            <p className="text-xs text-gray-500 mt-1">Email cannot be edited for imported CVs</p>
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
  );
}
