import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reference } from "@/lib/types";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck } from "lucide-react";

export default function ReferencesSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const { formData, handleChange, setFormData, resetForm } = useFormState({
    name: "",
    position: "",
    company: "",
    email: "",
    phone: "",
    relationship: "",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) resetForm();
    setEditingItemId(null);
  };

  const startEdit = (item: Reference) => {
    setEditingItemId(item.id);
    setShowAddForm(true);
    setFormData({
      name: item.name,
      position: item.position,
      company: item.company,
      email: item.email || "",
      phone: item.phone || "",
      relationship: item.relationship,
    });
  };

  const save = () => {
    const itemData: Omit<Reference, "id"> = {
      name: formData.name,
      position: formData.position,
      company: formData.company,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      relationship: formData.relationship,
    };

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        references: (mainCV.references || []).map((item) => item.id === editingItemId ? { ...item, ...itemData } : item),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddForm(false);
      resetForm();
    } else {
      const newItem: Reference = { id: Date.now().toString(), ...itemData };
      setMainCV({ ...mainCV, references: mainCV.references ? [newItem, ...mainCV.references] : [newItem], lastUpdated: new Date() });
      toggleAddForm();
    }
  };

  const remove = (id: string) => {
    if (!mainCV.references) return;
    setMainCV({ ...mainCV, references: mainCV.references.filter((item) => item.id !== id), lastUpdated: new Date() });
  };

  const renderForm = (isEdit: boolean) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">{isEdit ? "Edit" : "Add"} Reference</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
          <LucideX className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. John Smith" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Position/Title</label>
          <Input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Senior Manager" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Company/Organization</label>
          <Input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. ABC Corporation" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Relationship</label>
          <Input type="text" name="relationship" value={formData.relationship} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Direct Supervisor" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email (Optional)</label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. john@example.com" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Phone (Optional)</label>
          <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. +1 123 456 7890" />
        </div>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
        <Button size="sm" onClick={save} className="text-xs h-8 bg-black hover:bg-black/80 !text-white" disabled={!formData.name || !formData.position || !formData.company || !formData.relationship}>
          <LucideCheck className="w-3 h-3 mr-1" />{isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  const renderItem = (item: Reference) => (
    <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{item.name}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{item.position} at {item.company}</p>
          <p className="text-gray-500 text-xs">{item.relationship}</p>
          {(item.email || item.phone) && (
            <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-gray-500">
              {item.email && <span>{item.email}</span>}
              {item.phone && <span>{item.phone}</span>}
            </div>
          )}
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
        <h2 className="text-lg font-medium">References</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />Add Reference
        </Button>
      </div>
      {showAddForm && !editingItemId && <div className="mb-6">{renderForm(false)}</div>}
      {mainCV.references && mainCV.references.length > 0 ? (
        <div className="space-y-3">
          {mainCV.references.map((item) => (
            <div key={item.id}>{editingItemId === item.id ? renderForm(true) : renderItem(item)}</div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No references added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />Add Your First Reference
          </Button>
        </div>
      )}
    </>
  );
}
