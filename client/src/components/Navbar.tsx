import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [location, navigate] = useLocation();

  const goTo = (path: string) => {
    navigate(path);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white py-3 px-4 md:px-6 border-b border-gray-100 flex justify-between items-center">
      <div className="flex items-center">
        <div 
          onClick={() => goTo('/')}
          className="text-xl font-bold cursor-pointer"
        >
          <span className="text-[#0d6efd]">resume</span><span className="text-gray-700">.io</span>
        </div>
      </div>
      
      {!isAuthenticated ? (
        // Public navbar
        <div className="flex items-center">
          <div className="hidden md:flex space-x-6 mr-6">
            <div 
              onClick={() => scrollToSection('features')}
              className="text-sm text-gray-600 hover:text-[#0d6efd] transition-all cursor-pointer"
            >
              Features
            </div>
            <div
              onClick={() => scrollToSection('pricing')}
              className="text-sm text-gray-600 hover:text-[#0d6efd] transition-all cursor-pointer"
            >
              Pricing
            </div>
            <div
              className="text-sm text-gray-600 hover:text-[#0d6efd] transition-all cursor-pointer"
            >
              Resources
            </div>
            <div
              className="text-sm text-gray-600 hover:text-[#0d6efd] transition-all cursor-pointer"
            >
              FAQ
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div 
              onClick={() => goTo('/auth')}
              className="text-sm text-[#0d6efd] font-medium hover:underline cursor-pointer"
            >
              Log in
            </div>
            <Button
              onClick={() => goTo('/auth')}
              className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-sm font-medium px-4 py-2 rounded"
            >
              Build my resume
            </Button>
          </div>
        </div>
      ) : (
        // Authenticated navbar
        <div className="flex items-center space-x-4">
          {location === "/cv-management" ? (
            <Button
              onClick={() => goTo('/cv-builder')}
              className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-sm font-medium px-4 py-2 rounded"
            >
              Create New Resume
            </Button>
          ) : location === "/cv-builder" ? (
            <Button
              onClick={() => goTo('/cv-management')}
              className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-sm font-medium px-4 py-2 rounded"
            >
              Save & Exit
            </Button>
          ) : null}
          
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <span className="hidden md:inline text-sm font-medium">My Account</span>
          </div>
        </div>
      )}
    </nav>
  );
}
