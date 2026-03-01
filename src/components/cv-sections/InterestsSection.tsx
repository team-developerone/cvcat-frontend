import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LucidePlus, LucideTrash2, LucideX, LucideCheck } from "lucide-react";

export default function InterestsSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInterestKeyword, setNewInterestKeyword] = useState("");

  const { formData: newInterest, handleChange: handleInterestChange, resetForm: resetInterestForm } = useFormState({
    name: "",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) resetInterestForm();
  };

  const addInterest = () => {
    if (!newInterest.name.trim()) return;
    const interest = { id: Date.now().toString(), name: newInterest.name, keywords: [] as string[] };
    setMainCV({ ...mainCV, interests: mainCV.interests ? [interest, ...mainCV.interests] : [interest], lastUpdated: new Date() });
    resetInterestForm();
  };

  const removeInterest = (id: string) => {
    if (!mainCV.interests) return;
    setMainCV({ ...mainCV, interests: mainCV.interests.filter((i) => i.id !== id), lastUpdated: new Date() });
  };

  const addInterestKeyword = (interestId: string) => {
    if (!mainCV.interests || !newInterestKeyword.trim()) return;
    setMainCV({
      ...mainCV,
      interests: mainCV.interests.map((i) =>
        i.id === interestId ? { ...i, keywords: [...i.keywords, newInterestKeyword.trim()] } : i
      ),
      lastUpdated: new Date(),
    });
    setNewInterestKeyword("");
  };

  const removeInterestKeyword = (interestId: string, keyword: string) => {
    if (!mainCV.interests) return;
    setMainCV({
      ...mainCV,
      interests: mainCV.interests.map((i) =>
        i.id === interestId ? { ...i, keywords: i.keywords.filter((k) => k !== keyword) } : i
      ),
      lastUpdated: new Date(),
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Interests</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />Add Interest
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Add Interest</h3>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
              <LucideX className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Interest Name</label>
            <Input type="text" name="name" value={newInterest.name} onChange={handleInterestChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Open Source, Photography, Gaming" />
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
            <Button size="sm" onClick={addInterest} className="text-xs h-8 bg-black hover:bg-black/80 !text-white" disabled={!newInterest.name.trim()}>
              <LucideCheck className="w-3 h-3 mr-1" />Create Interest
            </Button>
          </div>
        </div>
      )}

      {mainCV.interests && mainCV.interests.length > 0 ? (
        <div className="space-y-4">
          {mainCV.interests.map((interest) => (
            <div key={interest.id} className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm">{interest.name}</h3>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50" onClick={() => removeInterest(interest.id)}>
                  <LucideTrash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {interest.keywords.map((kw, i) => (
                  <Badge key={i} variant="outline" className="bg-[#DAA520]/5 hover:bg-[#DAA520]/10 border-[#DAA520]/20 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                    {kw}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1 text-gray-400 hover:text-red-500 hover:bg-transparent" onClick={() => removeInterestKeyword(interest.id, kw)}>
                      <LucideX className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex">
                <Input
                  type="text"
                  value={newInterestKeyword}
                  onChange={(e) => setNewInterestKeyword(e.target.value)}
                  className="w-full h-8 text-xs focus-visible:ring-[#DAA520]"
                  placeholder="Add a keyword..."
                  onKeyDown={(e) => { if (e.key === "Enter" && newInterestKeyword.trim()) { e.preventDefault(); addInterestKeyword(interest.id); } }}
                />
                <Button size="sm" onClick={() => addInterestKeyword(interest.id)} disabled={!newInterestKeyword.trim()} className="ml-2 h-8 bg-black hover:bg-black/80 text-xs !text-white">Add</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No interests added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />Add Your Interests
          </Button>
        </div>
      )}
    </>
  );
}
