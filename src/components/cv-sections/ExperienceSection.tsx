import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AITextInput from "@/components/ui/ai-text-input";
import { WorkExperience } from "@/lib/types";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck } from "lucide-react";
import SortableList from "@/components/ui/sortable-list";

export default function ExperienceSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");
  const [editingHighlightIndex, setEditingHighlightIndex] = useState<number | null>(null);
  const [editingHighlightValue, setEditingHighlightValue] = useState("");

  const { formData, handleChange, setFormData, resetForm } = useFormState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    url: "",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      resetForm();
      setHighlights([]);
      setNewHighlight("");
    }
    setEditingItemId(null);
  };

  const startEdit = (item: WorkExperience) => {
    setEditingItemId(item.id);
    setShowAddForm(true);
    setFormData({
      company: item.company,
      position: item.position,
      startDate: item.startDate,
      endDate: item.endDate,
      description: item.description,
      location: item.location || "",
      url: item.url || "",
    });
    setHighlights(item.highlights || []);
    setNewHighlight("");
  };

  const save = () => {
    if (editingItemId) {
      setMainCV({
        ...mainCV,
        experience: mainCV.experience.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                company: formData.company,
                position: formData.position,
                startDate: formData.startDate,
                endDate: formData.endDate,
                description: formData.description,
                location: formData.location || undefined,
                url: formData.url || undefined,
                highlights: highlights.length > 0 ? highlights : undefined,
              }
            : item
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddForm(false);
      resetForm();
      setHighlights([]);
    } else {
      const newItem: WorkExperience = {
        id: Date.now().toString(),
        company: formData.company,
        position: formData.position,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        location: formData.location || undefined,
        url: formData.url || undefined,
        highlights: highlights.length > 0 ? highlights : undefined,
      };
      setMainCV({
        ...mainCV,
        experience: [newItem, ...mainCV.experience],
        lastUpdated: new Date(),
      });
      toggleAddForm();
    }
  };

  const remove = (id: string) => {
    setMainCV({
      ...mainCV,
      experience: mainCV.experience.filter((item) => item.id !== id),
      lastUpdated: new Date(),
    });
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
    if (editingHighlightIndex === index) {
      setEditingHighlightIndex(null);
      setEditingHighlightValue("");
    }
  };

  const startEditHighlight = (index: number) => {
    setEditingHighlightIndex(index);
    setEditingHighlightValue(highlights[index]);
  };

  const saveEditHighlight = () => {
    if (editingHighlightIndex !== null && editingHighlightValue.trim()) {
      setHighlights(highlights.map((h, i) => i === editingHighlightIndex ? editingHighlightValue.trim() : h));
    }
    setEditingHighlightIndex(null);
    setEditingHighlightValue("");
  };

  const cancelEditHighlight = () => {
    setEditingHighlightIndex(null);
    setEditingHighlightValue("");
  };

  // --- Shared form JSX ---
  const renderForm = (isEdit: boolean) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">{isEdit ? "Edit" : "Add"} Work Experience</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
          <LucideX className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
          <Input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Position</label>
          <Input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Location (Optional)</label>
          <Input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. San Francisco, CA" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">URL (Optional)</label>
          <Input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
          <Input type="text" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2022-09-01" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
          <Input type="text" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Present" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
          <AITextInput
            variant="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onValueChange={(val) => setFormData({ ...formData, description: val })}
            className="w-full min-h-[80px] focus-visible:ring-[#DAA520]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Highlights</label>
          {highlights.length > 0 && (
            <ul className="mb-2 space-y-1">
              {highlights.map((h, i) => (
                <li key={i} className="text-xs bg-white border border-gray-100 rounded px-2 py-1.5">
                  {editingHighlightIndex === i ? (
                    <div className="space-y-2">
                      <AITextInput
                        variant="textarea"
                        value={editingHighlightValue}
                        onChange={(e) => setEditingHighlightValue(e.target.value)}
                        onValueChange={(val) => setEditingHighlightValue(val)}
                        className="w-full min-h-[60px] text-xs focus-visible:ring-[#DAA520]"
                        onKeyDown={(e) => { if (e.key === "Escape") cancelEditHighlight(); }}
                      />
                      <div className="flex justify-end gap-1.5">
                        <Button variant="outline" size="sm" className="h-6 text-xs px-2" onClick={cancelEditHighlight}>
                          Cancel
                        </Button>
                        <Button size="sm" className="h-6 text-xs px-2 bg-black hover:bg-black/80 !text-white" onClick={saveEditHighlight}>
                          <LucideCheck className="w-3 h-3 mr-1" />Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="flex-1 cursor-pointer hover:text-gray-900" onClick={() => startEditHighlight(i)}>{h}</span>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-[#DAA520] flex-shrink-0" onClick={() => startEditHighlight(i)}>
                        <LucidePencil className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-red-500 flex-shrink-0" onClick={() => removeHighlight(i)}>
                        <LucideX className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="space-y-2">
            <AITextInput
              variant="textarea"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              onValueChange={(val) => setNewHighlight(val)}
              className="w-full min-h-[60px] text-xs focus-visible:ring-[#DAA520]"
              placeholder="Add a highlight..."
            />
            <div className="flex justify-end">
              <Button size="sm" onClick={addHighlight} disabled={!newHighlight.trim()} className="h-7 bg-black hover:bg-black/80 text-xs px-3 !text-white">
                <LucidePlus className="w-3 h-3 mr-1" />Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
        <Button size="sm" onClick={save} className="text-xs h-8 bg-black hover:bg-black/80 !text-white">
          <LucideCheck className="w-3 h-3 mr-1" />
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  // --- Item view block ---
  const renderItem = (item: WorkExperience) => (
    <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{item.position}</h3>
          <p className="text-gray-600 text-xs">{item.company}</p>
          <p className="text-gray-400 text-xs mt-0.5">
            {item.startDate}{item.endDate ? ` - ${item.endDate}` : ""}
            {item.location && ` • ${item.location}`}
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
      {item.highlights && item.highlights.length > 0 && (
        <ul className="mt-1 list-disc list-inside text-xs text-gray-600">
          {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-[#DAA520] hover:underline">{item.url}</a>
      )}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Work Experience</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />
          Add Experience
        </Button>
      </div>

      {showAddForm && !editingItemId && <div className="mb-6">{renderForm(false)}</div>}

      {mainCV.experience.length > 0 ? (
        <SortableList
          items={mainCV.experience}
          onReorder={(reordered) => setMainCV({ ...mainCV, experience: reordered, lastUpdated: new Date() })}
          renderItem={(item) => editingItemId === item.id ? renderForm(true) : renderItem(item)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No work experience added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />
            Add Your First Experience
          </Button>
        </div>
      )}
    </>
  );
}
