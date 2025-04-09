import { Feature } from "@/lib/types";

// Feature list
const features: Feature[] = [
  {
    icon: "fa-magic",
    title: "AI-Powered",
    description: "Our AI assistant helps you craft the perfect CV tailored to specific job roles."
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
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose <span className="text-[#DAA520]">CVCat</span></h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-14 w-14 rounded-full bg-[#DAA520]/10 flex items-center justify-center mb-4">
                <i className={`fas ${feature.icon} text-[#DAA520] text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
