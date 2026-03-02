import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AITextInput from "@/components/ui/ai-text-input";
import { Project } from "@/lib/types";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck, LucideChevronRight } from "lucide-react";
import SortableList from "@/components/ui/sortable-list";

export default function ProjectsSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");
  const [editingHighlightIndex, setEditingHighlightIndex] = useState<number | null>(null);
  const [editingHighlightValue, setEditingHighlightValue] = useState("");

  const { formData, handleChange, setFormData, resetForm } = useFormState({
    title: "",
    description: "",
    technologies: "",
    url: "",
    startDate: "",
    endDate: "",
    roles: "",
    entity: "",
    type: "",
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

  const startEdit = (item: Project) => {
    setEditingItemId(item.id);
    setShowAddForm(true);
    setFormData({
      title: item.title,
      description: item.description,
      technologies: item.technologies ? item.technologies.join(", ") : "",
      url: item.url || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      roles: item.roles ? item.roles.join(", ") : "",
      entity: item.entity || "",
      type: item.type || "",
    });
    setHighlights(item.highlights || []);
    setNewHighlight("");
  };

  const save = () => {
    const technologies = formData.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    const roles = formData.roles.split(",").map((r) => r.trim()).filter(Boolean);

    const itemData: Omit<Project, "id"> = {
      title: formData.title,
      description: formData.description,
      technologies,
      url: formData.url || undefined,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
      highlights: highlights.length > 0 ? highlights : undefined,
      roles: roles.length > 0 ? roles : undefined,
      entity: formData.entity || undefined,
      type: formData.type || undefined,
    };

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        projects: (mainCV.projects || []).map((item) =>
          item.id === editingItemId ? { ...item, ...itemData } : item
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddForm(false);
      resetForm();
      setHighlights([]);
    } else {
      const newItem: Project = { id: Date.now().toString(), ...itemData };
      setMainCV({
        ...mainCV,
        projects: mainCV.projects ? [newItem, ...mainCV.projects] : [newItem],
        lastUpdated: new Date(),
      });
      toggleAddForm();
    }
  };

  const remove = (id: string) => {
    if (!mainCV.projects) return;
    setMainCV({
      ...mainCV,
      projects: mainCV.projects.filter((item) => item.id !== id),
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
    if (editingHighlightIndex === index) { setEditingHighlightIndex(null); setEditingHighlightValue(""); }
  };

  const startEditHighlight = (index: number) => { setEditingHighlightIndex(index); setEditingHighlightValue(highlights[index]); };
  const saveEditHighlight = () => {
    if (editingHighlightIndex !== null && editingHighlightValue.trim()) {
      setHighlights(highlights.map((h, i) => i === editingHighlightIndex ? editingHighlightValue.trim() : h));
    }
    setEditingHighlightIndex(null); setEditingHighlightValue("");
  };
  const cancelEditHighlight = () => { setEditingHighlightIndex(null); setEditingHighlightValue(""); };

  const renderForm = (isEdit: boolean) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">{isEdit ? "Edit" : "Add"} Project</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
          <LucideX className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Project Title</label>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">URL (Optional)</label>
          <Input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Start Date (Optional)</label>
          <Input type="text" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2023-01" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">End Date (Optional)</label>
          <Input type="text" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2023-06" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Entity (Optional)</label>
          <Input type="text" name="entity" value={formData.entity} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Company or Organization" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type (Optional)</label>
          <Input type="text" name="type" value={formData.type} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. application, library" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Technologies (comma separated)</label>
          <Input type="text" name="technologies" value={formData.technologies} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. React, TypeScript, Node.js" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Roles (comma separated, optional)</label>
          <Input type="text" name="roles" value={formData.roles} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Lead Developer, Designer" />
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
                <li key={i} className="flex items-center gap-2 text-xs bg-white border border-gray-100 rounded px-2 py-1.5">
                  {editingHighlightIndex === i ? (
                    <div className="flex-1 flex items-center gap-1.5">
                      <AITextInput
                        variant="textarea"
                        value={editingHighlightValue}
                        onChange={(e) => setEditingHighlightValue(e.target.value)}
                        onValueChange={(val) => setEditingHighlightValue(val)}
                        className="w-full min-h-[60px] text-xs focus-visible:ring-[#DAA520]"
                        onKeyDown={(e) => { if (e.key === "Escape") cancelEditHighlight(); }}
                      />
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-green-600 flex-shrink-0" onClick={saveEditHighlight}>
                        <LucideCheck className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0" onClick={cancelEditHighlight}>
                        <LucideX className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 cursor-pointer hover:text-gray-900" onClick={() => startEditHighlight(i)}>{h}</span>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-[#DAA520] flex-shrink-0" onClick={() => startEditHighlight(i)}>
                        <LucidePencil className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-red-500 flex-shrink-0" onClick={() => removeHighlight(i)}>
                        <LucideX className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <AITextInput
              variant="textarea"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              onValueChange={(val) => setNewHighlight(val)}
              className="w-full min-h-[60px] text-xs focus-visible:ring-[#DAA520]"
              placeholder="Add a highlight..."
            />
            <Button size="sm" onClick={addHighlight} disabled={!newHighlight.trim()} className="h-8 bg-black hover:bg-black/80 text-xs px-3 !text-white">Add</Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
        <Button size="sm" onClick={save} className="text-xs h-8 bg-black hover:bg-black/80 !text-white" disabled={!formData.title || !formData.description}>
          <LucideCheck className="w-3 h-3 mr-1" />
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  const renderItem = (item: Project) => (
    <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{item.title}</h3>
          {item.entity && <p className="text-gray-600 text-xs">{item.entity}</p>}
          {item.startDate && (
            <p className="text-gray-400 text-xs mt-0.5">
              {item.startDate}{item.endDate ? ` - ${item.endDate}` : " - Present"}
            </p>
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
      <p className="mt-2 text-xs text-gray-600">{item.description}</p>
      {item.highlights && item.highlights.length > 0 && (
        <ul className="mt-1 list-disc list-inside text-xs text-gray-600">
          {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}
      {item.roles && item.roles.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.roles.map((role, i) => (
            <span key={i} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded">{role}</span>
          ))}
        </div>
      )}
      {item.technologies && item.technologies.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.technologies.map((tech, i) => (
            <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{tech}</span>
          ))}
        </div>
      )}
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs text-[#DAA520] hover:underline">
          <LucideChevronRight className="w-3 h-3 mr-0.5" />
          View Project
        </a>
      )}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Projects</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />
          Add Project
        </Button>
      </div>

      {showAddForm && !editingItemId && <div className="mb-6">{renderForm(false)}</div>}

      {mainCV.projects && mainCV.projects.length > 0 ? (
        <SortableList
          items={mainCV.projects}
          onReorder={(reordered) => setMainCV({ ...mainCV, projects: reordered, lastUpdated: new Date() })}
          renderItem={(item) => editingItemId === item.id ? renderForm(true) : renderItem(item)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No projects added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />
            Add Your First Project
          </Button>
        </div>
      )}
    </>
  );
}
