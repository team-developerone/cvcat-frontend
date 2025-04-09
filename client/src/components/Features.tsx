import { Feature } from "@/lib/types";

// Feature list
const features: Feature[] = [
  {
    icon: "fa-magic",
    title: "AI Assistant",
    description: "Our cat assistant helps craft CVs tailored to specific job roles."
  },
  {
    icon: "fa-layer-group",
    title: "Multiple Versions",
    description: "Create different versions of your CV for different applications."
  },
  {
    icon: "fa-file-export",
    title: "Export Options",
    description: "Export in PDF, Word, and LinkedIn compatible formats."
  },
  {
    icon: "fa-mobile-screen",
    title: "Mobile Friendly",
    description: "Build and edit your CV on any device with ease."
  },
  {
    icon: "fa-palette",
    title: "Clean Templates",
    description: "Choose from minimalist, professionally designed templates."
  },
  {
    icon: "fa-bolt",
    title: "Quick & Easy",
    description: "Create a professional CV in minutes with intuitive tools."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-12 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl font-medium mb-2">Why <span className="text-[#DAA520]">CVCat</span></h2>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Simple tools to build effective CVs for your job search
          </p>
          
          {/* Minimal cat paw icon */}
          <div className="mt-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.2"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.2"/>
            </svg>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-flat p-4 transition-colors">
              <div className="flex items-start mb-2">
                <div className="mr-3 text-[#DAA520]">
                  <i className={`fas ${feature.icon} text-sm`}></i>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
