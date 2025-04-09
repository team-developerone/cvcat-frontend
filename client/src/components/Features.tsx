import { Feature } from "@/lib/types";

// Feature list
const features: Feature[] = [
  {
    icon: "fa-wand-magic-sparkles",
    title: "AI-powered suggestions",
    description: "Get personalized suggestions to improve your resume and highlight your strengths."
  },
  {
    icon: "fa-layer-group",
    title: "Multiple versions",
    description: "Create and manage different versions of your resume tailored to different job applications."
  },
  {
    icon: "fa-file-export",
    title: "Export formats",
    description: "Download your resume in PDF, DOCX, or share a link directly with employers."
  },
  {
    icon: "fa-mobile-screen",
    title: "Mobile friendly",
    description: "Build and edit your resume on any device - desktop, tablet, or smartphone."
  },
  {
    icon: "fa-palette",
    title: "Beautiful templates",
    description: "Choose from professionally designed templates that stand out from the crowd."
  },
  {
    icon: "fa-bolt",
    title: "Quick and easy",
    description: "Create a professional resume in minutes, not hours, with our intuitive builder."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Build the perfect resume with all the features you need</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our resume builder has all the tools you need to create a professional resume that will help you land your dream job.
        </p>
        
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="text-[#0d6efd] mr-4 mt-1">
                <i className={`fas ${feature.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
