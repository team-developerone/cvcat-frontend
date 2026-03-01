import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award } from "@/lib/types";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck } from "lucide-react";

export default function AwardsSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const { formData, handleChange, setFormData, resetForm } = useFormState({
    title: "",
    date: "",
    awarder: "",
    summary: "",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) resetForm();
    setEditingItemId(null);
  };

  const startEdit = (item: Award) => {
    setEditingItemId(item.id);
    setShowAddForm(true);
    setFormData({ title: item.title, date: item.date, awarder: item.awarder, summary: item.summary || "" });
  };

  const save = () => {
    const itemData: Omit<Award, "id"> = {
      title: formData.title,
      date: formData.date,
      awarder: formData.awarder,
      summary: formData.summary || undefined,
    };

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        awards: (mainCV.awards || []).map((item) => item.id === editingItemId ? { ...item, ...itemData } : item),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddForm(false);
      resetForm();
    } else {
      const newItem: Award = { id: Date.now().toString(), ...itemData };
      setMainCV({ ...mainCV, awards: mainCV.awards ? [newItem, ...mainCV.awards] : [newItem], lastUpdated: new Date() });
      toggleAddForm();
    }
  };

  const remove = (id: string) => {
    if (!mainCV.awards) return;
    setMainCV({ ...mainCV, awards: mainCV.awards.filter((item) => item.id !== id), lastUpdated: new Date() });
  };

  const renderForm = (isEdit: boolean) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">{isEdit ? "Edit" : "Add"} Award</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
          <LucideX className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Award Title</label>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Employee of the Year" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Awarder</label>
          <Input type="text" name="awarder" value={formData.awarder} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Company Name" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
          <Input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2023-11-14" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Summary (Optional)</label>
          <Textarea name="summary" value={formData.summary} onChange={handleChange} className="w-full min-h-[60px] focus-visible:ring-[#DAA520]" />
        </div>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
        <Button size="sm" onClick={save} className="text-xs h-8 bg-black hover:bg-black/80 !text-white" disabled={!formData.title || !formData.awarder || !formData.date}>
          <LucideCheck className="w-3 h-3 mr-1" />{isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  const renderItem = (item: Award) => (
    <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{item.title}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{item.awarder} • {item.date}</p>
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
      {item.summary && <p className="mt-2 text-xs text-gray-600">{item.summary}</p>}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Awards</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />Add Award
        </Button>
      </div>
      {showAddForm && !editingItemId && <div className="mb-6">{renderForm(false)}</div>}
      {mainCV.awards && mainCV.awards.length > 0 ? (
        <div className="space-y-3">
          {mainCV.awards.map((item) => (
            <div key={item.id}>{editingItemId === item.id ? renderForm(true) : renderItem(item)}</div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No awards added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />Add Your First Award
          </Button>
        </div>
      )}
    </>
  );
}
