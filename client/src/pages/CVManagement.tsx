import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCV } from "@/lib/context";
import { CV } from "@/lib/types";

export default function CVManagement() {
  const { mainCV, tailoredCVs } = useCV();
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Layout isAuthenticated={true}>
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My CVs</h1>
          
          {/* Core CV Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Core CV</h2>
            
            {mainCV && (
              <Card className="bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all hover:transform hover:scale-[1.02]">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{mainCV.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 md:mb-0">
                        Last updated: {formatDate(mainCV.lastUpdated)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/cv-builder">
                        <Button
                          variant="outline"
                          className="px-3 py-1.5 border border-black rounded hover:bg-black hover:text-white transition-all"
                        >
                          <i className="fas fa-edit mr-1"></i> Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition-all"
                      >
                        <i className="fas fa-download mr-1"></i> Download
                      </Button>
                      <Button
                        variant="outline"
                        className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition-all"
                      >
                        <i className="fas fa-copy mr-1"></i> Duplicate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
          
          {/* Tailored CVs Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Tailored CVs</h2>
              <Button
                variant="ghost"
                className="text-[#DAA520] hover:text-black transition-all"
              >
                <i className="fas fa-plus mr-1"></i> Create Tailored Version
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tailored CV Cards */}
              {tailoredCVs.map((cv) => (
                <Card key={cv.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all hover:transform hover:scale-[1.02]">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{cv.title}</h3>
                        <p className="text-sm text-gray-500">Modified for {cv.forJob}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button className="text-gray-500 hover:text-[#DAA520] transition-all">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 text-sm">{cv.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Created: {formatDate(cv.lastUpdated)}</span>
                      <div className="flex space-x-2">
                        <Link href="/cv-builder">
                          <a className="text-xs text-[#DAA520] hover:underline">Edit</a>
                        </Link>
                        <button className="text-xs text-[#DAA520] hover:underline">Download</button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Empty Tailored CV Card */}
              <Card className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center mb-4">
                  <i className="fas fa-plus text-[#DAA520]"></i>
                </div>
                <h3 className="font-medium mb-2">Create Tailored CV</h3>
                <p className="text-sm text-gray-600 mb-4">Customize your CV for specific job applications</p>
                <Button className="px-4 py-2 bg-black text-white rounded hover:bg-[#DAA520] transition-all">
                  Get Started
                </Button>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
