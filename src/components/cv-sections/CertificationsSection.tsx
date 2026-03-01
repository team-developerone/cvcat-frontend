import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Certification } from "@/lib/types";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck, LucideChevronRight } from "lucide-react";
import SortableList from "@/components/ui/sortable-list";

export default function CertificationsSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const { formData, handleChange, setFormData, resetForm } = useFormState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    url: "",
    description: "",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) resetForm();
    setEditingItemId(null);
  };

  const startEdit = (item: Certification) => {
    setEditingItemId(item.id);
    setShowAddForm(true);
    setFormData({
      name: item.name,
      issuer: item.issuer,
      date: item.date,
      expiryDate: item.expiryDate || "",
      url: item.url || "",
      description: item.description || "",
    });
  };

  const save = () => {
    const itemData: Omit<Certification, "id"> = {
      name: formData.name,
      issuer: formData.issuer,
      date: formData.date,
      expiryDate: formData.expiryDate || undefined,
      url: formData.url || undefined,
      description: formData.description || undefined,
    };

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        certifications: (mainCV.certifications || []).map((item) =>
          item.id === editingItemId ? { ...item, ...itemData } : item
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddForm(false);
      resetForm();
    } else {
      const newItem: Certification = { id: Date.now().toString(), ...itemData };
      setMainCV({
        ...mainCV,
        certifications: mainCV.certifications ? [newItem, ...mainCV.certifications] : [newItem],
        lastUpdated: new Date(),
      });
      toggleAddForm();
    }
  };

  const remove = (id: string) => {
    if (!mainCV.certifications) return;
    setMainCV({
      ...mainCV,
      certifications: mainCV.certifications.filter((item) => item.id !== id),
      lastUpdated: new Date(),
    });
  };

  const renderForm = (isEdit: boolean) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">{isEdit ? "Edit" : "Add"} Certification</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
          <LucideX className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Certification Name</label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. AWS Certified Solutions Architect" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Issuing Organization</label>
          <Input type="text" name="issuer" value={formData.issuer} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Amazon Web Services" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Issue Date</label>
          <Input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2023-06-15" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date (Optional)</label>
          <Input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2026-06-15" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Credential URL (Optional)</label>
          <Input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="https://..." />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
          <Textarea name="description" value={formData.description} onChange={handleChange} className="w-full min-h-[60px] focus-visible:ring-[#DAA520]" placeholder="Brief description of the certification" />
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
        <Button size="sm" onClick={save} className="text-xs h-8 bg-black hover:bg-black/80 !text-white" disabled={!formData.name || !formData.issuer || !formData.date}>
          <LucideCheck className="w-3 h-3 mr-1" />
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  const renderItem = (item: Certification) => (
    <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{item.name}</h3>
          <p className="text-gray-500 text-xs mt-0.5">
            {item.issuer} • Issued {item.date}
            {item.expiryDate && ` • Expires ${item.expiryDate}`}
          </p>
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
      {item.description && <p className="mt-2 text-xs text-gray-600">{item.description}</p>}
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs text-[#DAA520] hover:underline">
          <LucideChevronRight className="w-3 h-3 mr-0.5" />
          View Credential
        </a>
      )}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Certifications</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />
          Add Certification
        </Button>
      </div>

      {showAddForm && !editingItemId && <div className="mb-6">{renderForm(false)}</div>}

      {mainCV.certifications && mainCV.certifications.length > 0 ? (
        <SortableList
          items={mainCV.certifications}
          onReorder={(reordered) => setMainCV({ ...mainCV, certifications: reordered, lastUpdated: new Date() })}
          renderItem={(item) => editingItemId === item.id ? renderForm(true) : renderItem(item)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No certifications added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />
            Add Your First Certification
          </Button>
        </div>
      )}
    </>
  );
}
