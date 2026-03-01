import { useCV } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PersonalInfoSection() {
  const { mainCV, setMainCV } = useCV();

  if (!mainCV) return null;

  const updatePersonalInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMainCV({
      ...mainCV,
      personalInfo: { ...mainCV.personalInfo, [name]: value },
      lastUpdated: new Date(),
    });
  };

  return (
    <div className="mb-5">
      <h2 className="text-lg font-medium mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
          <Input type="text" name="fullName" value={mainCV.personalInfo.fullName} onChange={updatePersonalInfo} className="w-full h-9 focus-visible:ring-[#DAA520]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Professional Title</label>
          <Input type="text" name="title" value={mainCV.personalInfo.title} onChange={updatePersonalInfo} className="w-full h-9 focus-visible:ring-[#DAA520]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <Input type="email" name="email" value={mainCV.personalInfo.email} onChange={updatePersonalInfo} className="w-full h-9 focus-visible:ring-[#DAA520]" />
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
          <Textarea name="summary" value={mainCV.personalInfo.summary} onChange={updatePersonalInfo} className="w-full min-h-[100px] focus-visible:ring-[#DAA520]" placeholder="Brief overview of your professional background..." />
        </div>
      </div>
    </div>
  );
}
