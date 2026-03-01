import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Education } from "@/lib/types";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck } from "lucide-react";

export default function EducationSection() {
  const { mainCV, setMainCV } = useCV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [courses, setCourses] = useState<string[]>([]);
  const [newCourse, setNewCourse] = useState("");

  const { formData, handleChange, setFormData, resetForm } = useFormState({
    institution: "",
    studyType: "",
    area: "",
    startDate: "",
    endDate: "",
    score: "",
    url: "",
    description: "",
  });

  if (!mainCV) return null;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      resetForm();
      setCourses([]);
      setNewCourse("");
    }
    setEditingItemId(null);
  };

  const startEdit = (item: Education) => {
    setEditingItemId(item.id);
    setShowAddForm(true);
    setFormData({
      institution: item.institution,
      studyType: item.studyType,
      area: item.area,
      startDate: item.startDate,
      endDate: item.endDate,
      score: item.score || "",
      url: item.url || "",
      description: item.description || "",
    });
    setCourses(item.courses || []);
    setNewCourse("");
  };

  const save = () => {
    const itemData: Omit<Education, "id"> = {
      institution: formData.institution,
      studyType: formData.studyType,
      area: formData.area,
      startDate: formData.startDate,
      endDate: formData.endDate,
      score: formData.score || undefined,
      url: formData.url || undefined,
      description: formData.description || undefined,
      courses: courses.length > 0 ? courses : undefined,
    };

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        education: mainCV.education.map((item) =>
          item.id === editingItemId ? { ...item, ...itemData } : item
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddForm(false);
      resetForm();
      setCourses([]);
    } else {
      setMainCV({
        ...mainCV,
        education: [{ id: Date.now().toString(), ...itemData }, ...mainCV.education],
        lastUpdated: new Date(),
      });
      toggleAddForm();
    }
  };

  const remove = (id: string) => {
    setMainCV({
      ...mainCV,
      education: mainCV.education.filter((item) => item.id !== id),
      lastUpdated: new Date(),
    });
  };

  const addCourse = () => {
    if (newCourse.trim()) {
      setCourses([...courses, newCourse.trim()]);
      setNewCourse("");
    }
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const renderForm = (isEdit: boolean) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">{isEdit ? "Edit" : "Add"} Education</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddForm}>
          <LucideX className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Institution</label>
          <Input type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Study Type</label>
          <Input type="text" name="studyType" value={formData.studyType} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Bachelor's, Master's" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Area of Study</label>
          <Input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Computer Science" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
          <Input type="text" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2018-09" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
          <Input type="text" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 2022-06" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Score / GPA (Optional)</label>
          <Input type="text" name="score" value={formData.score} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. 3.8/4.0" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">URL (Optional)</label>
          <Input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="https://..." />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
          <Textarea name="description" value={formData.description} onChange={handleChange} className="w-full min-h-[60px] focus-visible:ring-[#DAA520]" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Courses</label>
          {courses.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {courses.map((c, i) => (
                <span key={i} className="inline-flex items-center text-xs px-2 py-0.5 bg-white border border-gray-100 rounded">
                  {c}
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1 text-gray-400 hover:text-red-500" onClick={() => removeCourse(i)}>
                    <LucideX className="w-3 h-3" />
                  </Button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="w-full h-8 text-xs focus-visible:ring-[#DAA520]"
              placeholder="Add a course..."
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCourse(); } }}
            />
            <Button size="sm" onClick={addCourse} disabled={!newCourse.trim()} className="h-8 bg-black hover:bg-black/80 text-xs px-3">Add</Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs h-8">Cancel</Button>
        <Button size="sm" onClick={save} className="text-xs h-8 bg-black hover:bg-black/80">
          <LucideCheck className="w-3 h-3 mr-1" />
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  const renderItem = (item: Education) => (
    <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{[item.studyType, item.area].filter(Boolean).join(" in ")}</h3>
          <p className="text-gray-600 text-xs">{item.institution}</p>
          <p className="text-gray-400 text-xs mt-0.5">{[item.startDate, item.endDate].filter(Boolean).join(" - ")}</p>
          {item.score && <p className="text-gray-500 text-xs mt-0.5">GPA: {item.score}</p>}
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
      {item.courses && item.courses.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {item.courses.map((course, i) => (
            <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{course}</span>
          ))}
        </div>
      )}
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-[#DAA520] hover:underline">{item.url}</a>
      )}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Education</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5" onClick={toggleAddForm}>
          <LucidePlus className="w-3 h-3 mr-1" />
          Add Education
        </Button>
      </div>

      {showAddForm && !editingItemId && <div className="mb-6">{renderForm(false)}</div>}

      {mainCV.education.length > 0 ? (
        <div className="space-y-3">
          {mainCV.education.map((item) => (
            <div key={item.id}>
              {editingItemId === item.id ? renderForm(true) : renderItem(item)}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <p className="text-gray-500 text-sm mb-3">No education added yet</p>
          <Button variant="outline" size="sm" onClick={toggleAddForm} className="text-xs">
            <LucidePlus className="w-3.5 h-3.5 mr-1" />
            Add Your Education
          </Button>
        </div>
      )}
    </>
  );
}
