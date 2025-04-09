import { useState } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WorkExperience, Education } from "@/lib/types";

export default function CVBuilderForm() {
  const { mainCV, setMainCV } = useCV();
  const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);
  
  // Form state for new experience
  const { formData: newExperience, handleChange: handleExperienceChange, resetForm: resetExperienceForm } = useFormState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  
  // Toggle add experience form
  const toggleAddExperienceForm = () => {
    setShowAddExperienceForm(!showAddExperienceForm);
    if (!showAddExperienceForm) {
      resetExperienceForm();
    }
  };
  
  // Handle updating personal info
  const updatePersonalInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!mainCV) return;
    
    const { name, value } = e.target;
    setMainCV({
      ...mainCV,
      personalInfo: {
        ...mainCV.personalInfo,
        [name]: value
      }
    });
  };
  
  // Add new experience
  const addExperience = () => {
    if (!mainCV) return;
    
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: newExperience.company,
      position: newExperience.position,
      startDate: newExperience.startDate,
      endDate: newExperience.endDate,
      description: newExperience.description
    };
    
    setMainCV({
      ...mainCV,
      experience: [newExp, ...mainCV.experience],
      lastUpdated: new Date()
    });
    
    toggleAddExperienceForm();
  };
  
  // Remove experience
  const removeExperience = (id: string) => {
    if (!mainCV) return;
    
    setMainCV({
      ...mainCV,
      experience: mainCV.experience.filter(exp => exp.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove education
  const removeEducation = (id: string) => {
    if (!mainCV) return;
    
    setMainCV({
      ...mainCV,
      education: mainCV.education.filter(edu => edu.id !== id),
      lastUpdated: new Date()
    });
  };
  
  if (!mainCV) return null;
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold mb-6">CV Builder</h1>
      
      {/* Personal Info Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button className="text-[#DAA520] hover:text-black transition-all">
            <i className="fas fa-edit"></i>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input
              type="text"
              name="fullName"
              value={mainCV.personalInfo.fullName}
              onChange={updatePersonalInfo}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <Input
              type="text"
              name="title"
              value={mainCV.personalInfo.title}
              onChange={updatePersonalInfo}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={mainCV.personalInfo.email}
              onChange={updatePersonalInfo}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <Input
              type="tel"
              name="phone"
              value={mainCV.personalInfo.phone}
              onChange={updatePersonalInfo}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Input
              type="text"
              name="location"
              value={mainCV.personalInfo.location}
              onChange={updatePersonalInfo}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
            <Textarea
              name="summary"
              value={mainCV.personalInfo.summary}
              onChange={updatePersonalInfo}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
              rows={4}
            />
          </div>
        </div>
      </div>
      
      {/* Work Experience Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <button 
            className="text-[#DAA520] hover:text-black transition-all"
            onClick={toggleAddExperienceForm}
          >
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        
        {/* Add Experience Form */}
        {showAddExperienceForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-4">Add Work Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <Input
                  type="text"
                  name="company"
                  value={newExperience.company}
                  onChange={handleExperienceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <Input
                  type="text"
                  name="position"
                  value={newExperience.position}
                  onChange={handleExperienceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <Input
                  type="month"
                  name="startDate"
                  value={newExperience.startDate}
                  onChange={handleExperienceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <Input
                  type="month"
                  name="endDate"
                  value={newExperience.endDate}
                  onChange={handleExperienceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  name="description"
                  value={newExperience.description}
                  onChange={handleExperienceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-3">
              <Button
                variant="outline"
                onClick={toggleAddExperienceForm}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={addExperience}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-[#DAA520] transition-all"
              >
                Add Experience
              </Button>
            </div>
          </div>
        )}
        
        {/* Experience Items */}
        <div className="space-y-6">
          {mainCV.experience.map((exp) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-md hover:border-[#DAA520] transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-[#DAA520] transition-all">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-red-500 transition-all"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <p className="mt-3 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Education Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button className="text-[#DAA520] hover:text-black transition-all">
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        
        {/* Education Items */}
        <div className="space-y-6">
          {mainCV.education.map((edu) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded-md hover:border-[#DAA520] transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.period}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-[#DAA520] transition-all">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-red-500 transition-all"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <p className="mt-3 text-gray-700">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Skills Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <button className="text-[#DAA520] hover:text-black transition-all">
            <i className="fas fa-edit"></i>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {mainCV.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-[#DAA520]/10 text-black rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Add Section Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="flex items-center justify-center space-x-2 px-4 py-2 border border-dashed border-gray-300 rounded-md hover:border-[#DAA520] transition-all"
        >
          <i className="fas fa-plus text-[#DAA520]"></i>
          <span>Add Section</span>
        </Button>
      </div>
    </div>
  );
}
