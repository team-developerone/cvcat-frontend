import { Feature } from "@/lib/types";

// Feature list
const features: Feature[] = [
  {
    icon: "fa-magic",
    title: "AI-Powered Assistant",
    description: "Our AI cat assistant helps you craft the purr-fect CV tailored to specific job roles."
  },
  {
    icon: "fa-layer-group",
    title: "Multiple Versions",
    description: "Create and manage different versions of your CV tailored to different job applications."
  },
  {
    icon: "fa-file-export",
    title: "Export Anywhere",
    description: "Export your CV in multiple formats including PDF, Word, and LinkedIn compatible."
  },
  {
    icon: "fa-mobile-screen",
    title: "Mobile Friendly",
    description: "Build and edit your CV on any device - as agile and flexible as a cat."
  },
  {
    icon: "fa-palette",
    title: "Elegant Templates",
    description: "Choose from professionally designed templates with the elegance of a feline."
  },
  {
    icon: "fa-bolt",
    title: "Quick and Easy",
    description: "Create a professional CV in minutes, not hours - we're as fast as a cat on catnip."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose <span className="text-[#DAA520]">CVCat</span></h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Our CV builder combines feline grace with powerful features to help you land your dream job.
          </p>
          
          {/* Cat Paw Decorations */}
          <div className="absolute -top-6 left-1/4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.2"/>
            </svg>
          </div>
          <div className="absolute top-0 right-1/4 transform -scale-x-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.2"/>
            </svg>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 hover:border-[#DAA520] transition-all shadow-sm hover:shadow">
              <div className="h-12 w-12 rounded-full bg-[#DAA520]/10 flex items-center justify-center mb-4">
                <i className={`fas ${feature.icon} text-[#DAA520] text-xl`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
