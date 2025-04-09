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
    <section id="features" className="py-12 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute -top-10 right-10 w-40 h-40">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" fill="#000000" fillOpacity="0.05"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-xl font-medium mb-2">Why <span className="text-[#DAA520]">CVCat</span></h2>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Simple tools to build effective CVs for your job search
          </p>
          
          {/* Minimal cat paw icon */}
          <div className="mt-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.5"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.5"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.5"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.5"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.5"/>
            </svg>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-flat bg-white hover:bg-gray-50 p-4 transition-all">
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
