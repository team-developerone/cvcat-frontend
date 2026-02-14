import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

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
          className="flex items-center cursor-pointer"
        >
          {/* Modern Sleek Cat Logo */}
          <Logo size="md" />
        </div>
      </div>
      
      {!isAuthenticated ? (
        // Public navbar
        <div className="flex items-center">
          <div className="hidden md:flex space-x-6 mr-6">
            <div 
              onClick={() => scrollToSection('features')}
              className="text-sm text-gray-700 hover:text-[#DAA520] transition-all cursor-pointer"
            >
              Features
            </div>
            <div
              onClick={() => scrollToSection('pricing')}
              className="text-sm text-gray-700 hover:text-[#DAA520] transition-all cursor-pointer"
            >
              Pricing
            </div>
            <div
              onClick={() => goTo('/team')}
              className="text-sm text-gray-700 hover:text-[#DAA520] transition-all cursor-pointer"
            >
              Team
            </div>
            <div
              className="text-sm text-gray-700 hover:text-[#DAA520] transition-all cursor-pointer"
            >
              Resources
            </div>
            <div
              className="text-sm text-gray-700 hover:text-[#DAA520] transition-all cursor-pointer"
            >
              FAQ
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div 
              onClick={() => goTo('/auth')}
              className="text-sm text-gray-700 font-medium hover:text-[#DAA520] cursor-pointer"
            >
              Log in
            </div>
            <Button
              onClick={() => goTo('/auth')}
              className="bg-black hover:bg-[#DAA520] text-white text-sm font-medium px-4 py-2 rounded"
            >
              Get Started
            </Button>
          </div>
        </div>
      ) : (
        // Authenticated navbar
        <div className="flex items-center space-x-4">
          {location === "/cv-management" ? (
            <Button
              onClick={() => goTo('/cv-builder')}
              className="bg-black hover:bg-[#DAA520] text-white text-sm font-medium px-4 py-2 rounded"
            >
              Create New CV
            </Button>
          ) : location === "/cv-builder" ? (
            <Button
              onClick={() => goTo('/cv-management')}
              className="bg-black hover:bg-[#DAA520] text-white text-sm font-medium px-4 py-2 rounded"
            >
              Save & Exit
            </Button>
          ) : null}
          
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#DAA520]/10 border border-[#DAA520]/30 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="hidden md:inline text-sm font-medium">My Account</span>
          </div>
        </div>
      )}
    </nav>
  );
}
