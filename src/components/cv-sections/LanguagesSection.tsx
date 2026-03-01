import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Language } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck } from "lucide-react";

export default function LanguagesSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const { formData, handleChange, setFormData, resetForm } = useFormState({
    name: "",
    proficiency: "Professional Working",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) resetForm();
    setEditingItemId(null);
  };

  const startEdit = (item: Language) => {
    setEditingItemId(item.id);
    setShowAddForm(true);
    setFormData({ name: item.name, proficiency: item.proficiency });
  };

  const save = () => {
    const itemData: Omit<Language, "id"> = {
      name: formData.name,
      proficiency: formData.proficiency as Language["proficiency"],
    };

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        languages: (mainCV.languages || []).map((item) => item.id === editingItemId ? { ...item, ...itemData } : item),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddForm(false);
      resetForm();
    } else {
      const newItem: Language = { id: Date.now().toString(), ...itemData };
      setMainCV({ ...mainCV, languages: mainCV.languages ? [newItem, ...mainCV.languages] : [newItem], lastUpdated: new Date() });
      toggleAddForm();
    }
  };

  const remove = (id: string) => {
    if (!mainCV.languages) return;
    setMainCV({ ...mainCV, languages: mainCV.languages.filter((item) => item.id !== id), lastUpdated: new Date() });
  };

  const renderForm = (isEdit: boolean) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">{isEdit ? "Edit" : "Add"} Language</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
          <LucideX className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Language</label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. English, Spanish, French" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Proficiency Level</label>
          <select name="proficiency" value={formData.proficiency} onChange={handleChange}
            className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DAA520]">
            <option value="Elementary">Elementary</option>
            <option value="Limited Working">Limited Working</option>
            <option value="Professional Working">Professional Working</option>
            <option value="Full Professional">Full Professional</option>
            <option value="Native/Bilingual">Native/Bilingual</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
        <Button size="sm" onClick={save} className="text-xs h-8 bg-black hover:bg-black/80" disabled={!formData.name}>
          <LucideCheck className="w-3 h-3 mr-1" />{isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  const renderItem = (item: Language) => (
    <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">{item.name}</div>
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-0.5 text-[10px]">{item.proficiency}</Badge>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-[#DAA520] hover:bg-gray-50" onClick={() => startEdit(item)}>
            <LucidePencil className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50" onClick={() => remove(item.id)}>
            <LucideTrash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Languages</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />Add Language
        </Button>
      </div>
      {showAddForm && !editingItemId && <div className="mb-6">{renderForm(false)}</div>}
      {mainCV.languages && mainCV.languages.length > 0 ? (
        <div className="space-y-3">
          {mainCV.languages.map((item) => (
            <div key={item.id}>{editingItemId === item.id ? renderForm(true) : renderItem(item)}</div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No languages added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />Add Your First Language
          </Button>
        </div>
      )}
    </>
  );
}
