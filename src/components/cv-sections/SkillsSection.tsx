import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LucidePlus, LucideTrash2, LucideX, LucideCheck } from "lucide-react";

export default function SkillsSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkillKeyword, setNewSkillKeyword] = useState("");

  const { formData: newSkillGroup, handleChange: handleSkillGroupChange, resetForm: resetSkillGroupForm } = useFormState({
    name: "",
    level: "",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      resetSkillGroupForm();
      setNewSkillKeyword("");
    }
  };

  const addSkillGroup = () => {
    if (!newSkillGroup.name.trim()) return;
    const group = {
      id: Date.now().toString(),
      name: newSkillGroup.name,
      level: newSkillGroup.level || undefined,
      keywords: [] as string[],
    };
    setMainCV({ ...mainCV, skills: [...mainCV.skills, group], lastUpdated: new Date() });
    resetSkillGroupForm();
    setNewSkillKeyword("");
  };

  const removeSkillGroup = (id: string) => {
    setMainCV({ ...mainCV, skills: mainCV.skills.filter((g) => g.id !== id), lastUpdated: new Date() });
  };

  const addSkillKeyword = (groupId: string) => {
    if (!newSkillKeyword.trim()) return;
    setMainCV({
      ...mainCV,
      skills: mainCV.skills.map((g) =>
        g.id === groupId ? { ...g, keywords: [...g.keywords, newSkillKeyword.trim()] } : g
      ),
      lastUpdated: new Date(),
    });
    setNewSkillKeyword("");
  };

  const removeSkillKeyword = (groupId: string, keyword: string) => {
    setMainCV({
      ...mainCV,
      skills: mainCV.skills.map((g) =>
        g.id === groupId ? { ...g, keywords: g.keywords.filter((k) => k !== keyword) } : g
      ),
      lastUpdated: new Date(),
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Skills</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />Add Skill Group
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Add Skill Group</h3>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
              <LucideX className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Group Name</label>
              <Input type="text" name="name" value={newSkillGroup.name} onChange={handleSkillGroupChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Programming Languages" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Level (Optional)</label>
              <Input type="text" name="level" value={newSkillGroup.level} onChange={handleSkillGroupChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Advanced, Expert" />
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
            <Button size="sm" onClick={addSkillGroup} className="text-xs h-8 bg-black hover:bg-black/80 !text-white" disabled={!newSkillGroup.name.trim()}>
              <LucideCheck className="w-3 h-3 mr-1" />Create Group
            </Button>
          </div>
        </div>
      )}

      {mainCV.skills.length > 0 ? (
        <div className="space-y-4">
          {mainCV.skills.map((group) => (
            <div key={group.id} className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm">{group.name}</h3>
                  {group.level && (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-0.5 text-[10px]">{group.level}</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50" onClick={() => removeSkillGroup(group.id)}>
                  <LucideTrash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {group.keywords.map((keyword, i) => (
                  <Badge key={i} variant="outline" className="bg-[#DAA520]/5 hover:bg-[#DAA520]/10 border-[#DAA520]/20 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                    {keyword}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1 text-gray-400 hover:text-red-500 hover:bg-transparent" onClick={() => removeSkillKeyword(group.id, keyword)}>
                      <LucideX className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex">
                <Input
                  type="text"
                  value={newSkillKeyword}
                  onChange={(e) => setNewSkillKeyword(e.target.value)}
                  className="w-full h-8 text-xs focus-visible:ring-[#DAA520]"
                  placeholder="Add a skill..."
                  onKeyDown={(e) => { if (e.key === "Enter" && newSkillKeyword.trim()) { e.preventDefault(); addSkillKeyword(group.id); } }}
                />
                <Button size="sm" onClick={() => addSkillKeyword(group.id)} disabled={!newSkillKeyword.trim()} className="ml-2 h-8 bg-black hover:bg-black/80 text-xs !text-white">Add</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No skills added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />Add Your First Skill Group
          </Button>
        </div>
      )}
    </>
  );
}
