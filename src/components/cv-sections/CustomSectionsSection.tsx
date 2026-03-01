import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomSection, CustomSectionItem } from "@/lib/types";
import { LucidePlus, LucideTrash2, LucideX, LucideCheck } from "lucide-react";

export default function CustomSectionsSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState<string | null>(null);

  const { formData: newSection, handleChange: handleSectionChange, resetForm: resetSectionForm } = useFormState({ title: "" });
  const { formData: newItem, handleChange: handleItemChange, resetForm: resetItemForm } = useFormState({
    title: "",
    subtitle: "",
    date: "",
    description: "",
  });

  if (!mainCV) return null;

  const toggleAddSectionForm = () => {
    setShowAddSectionForm(!showAddSectionForm);
    if (!showAddSectionForm) resetSectionForm();
  };

  const toggleAddItemForm = (sectionId: string | null) => {
    setShowAddItemForm(sectionId);
    if (sectionId === null) resetItemForm();
  };

  const addSection = () => {
    if (!newSection.title.trim()) return;
    const section: CustomSection = { id: Date.now().toString(), title: newSection.title, items: [] };
    setMainCV({
      ...mainCV,
      customSections: mainCV.customSections ? [...mainCV.customSections, section] : [section],
      lastUpdated: new Date(),
    });
    toggleAddSectionForm();
  };

  const removeSection = (id: string) => {
    if (!mainCV.customSections) return;
    setMainCV({ ...mainCV, customSections: mainCV.customSections.filter((s) => s.id !== id), lastUpdated: new Date() });
  };

  const addItem = (sectionId: string) => {
    if (!mainCV.customSections) return;
    const item: CustomSectionItem = {
      id: Date.now().toString(),
      title: newItem.title,
      subtitle: newItem.subtitle || undefined,
      date: newItem.date || undefined,
      description: newItem.description || undefined,
    };
    setMainCV({
      ...mainCV,
      customSections: mainCV.customSections.map((s) =>
        s.id === sectionId ? { ...s, items: [item, ...s.items] } : s
      ),
      lastUpdated: new Date(),
    });
    toggleAddItemForm(null);
  };

  const removeItem = (sectionId: string, itemId: string) => {
    if (!mainCV.customSections) return;
    setMainCV({
      ...mainCV,
      customSections: mainCV.customSections.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
      ),
      lastUpdated: new Date(),
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Custom Sections</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddSectionForm}>
          <LucidePlus className="w-3 h-3 mr-1" />Add Section
        </Button>
      </div>

      {showAddSectionForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Create New Section</h3>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddSectionForm}>
              <LucideX className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Section Title</label>
            <Input type="text" name="title" value={newSection.title} onChange={handleSectionChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Hobbies, Side Projects, etc." />
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" size="sm" onClick={toggleAddSectionForm} className="text-xs h-8">Cancel</Button>
            <Button size="sm" onClick={addSection} className="text-xs h-8 bg-black hover:bg-black/80" disabled={!newSection.title.trim()}>
              <LucideCheck className="w-3 h-3 mr-1" />Create Section
            </Button>
          </div>
        </div>
      )}

      {mainCV.customSections && mainCV.customSections.length > 0 ? (
        <div className="space-y-4">
          {mainCV.customSections.map((section) => (
            <div key={section.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">{section.title}</h3>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50" onClick={() => removeSection(section.id)}>
                  <LucideTrash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {section.items.length > 0 ? (
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id} className="p-2 bg-gray-50 rounded-md text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.title}</span>
                        <div className="flex space-x-1">
                          {item.date && <span className="text-gray-500 text-xs mr-2 self-center">{item.date}</span>}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-100" onClick={() => removeItem(section.id, item.id)}>
                            <LucideTrash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      {item.subtitle && <p className="text-gray-600 text-xs">{item.subtitle}</p>}
                      {item.description && <p className="text-gray-600 text-xs mt-1">{item.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No items added yet</p>
              )}

              <Button variant="outline" size="sm" className="mt-3 text-xs h-7 w-full" onClick={() => toggleAddItemForm(section.id)}>
                <LucidePlus className="w-3 h-3 mr-1" />Add Item to {section.title}
              </Button>

              {showAddItemForm === section.id && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-medium">Add Item to {section.title}</h3>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-6 w-6 p-0" onClick={() => toggleAddItemForm(null)}>
                      <LucideX className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <Input type="text" name="title" value={newItem.title} onChange={handleItemChange} className="w-full h-8 text-sm focus-visible:ring-[#DAA520]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (Optional)</label>
                      <Input type="text" name="subtitle" value={newItem.subtitle} onChange={handleItemChange} className="w-full h-8 text-sm focus-visible:ring-[#DAA520]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Date (Optional)</label>
                      <Input type="text" name="date" value={newItem.date} onChange={handleItemChange} className="w-full h-8 text-sm focus-visible:ring-[#DAA520]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
                      <Textarea name="description" value={newItem.description} onChange={handleItemChange} className="w-full min-h-[60px] text-sm focus-visible:ring-[#DAA520]" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3 gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleAddItemForm(null)} className="text-xs h-7">Cancel</Button>
                    <Button size="sm" onClick={() => addItem(section.id)} className="text-xs h-7 bg-black hover:bg-black/80" disabled={!newItem.title.trim()}>
                      <LucideCheck className="w-3 h-3 mr-1" />Add Item
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No custom sections added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddSectionForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />Create Your First Section
          </Button>
        </div>
      )}
    </>
  );
}
