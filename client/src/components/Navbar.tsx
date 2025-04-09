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
          className="flex items-center cursor-pointer"
        >
          {/* Cat Logo */}
          <div className="w-8 h-8 mr-2">
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 5C25 5 27.5 12.5 22.5 20C19 25 12.5 30 15 40C15 40 22.5 37.5 25 25C25 25 27.5 37.5 37.5 45C37.5 45 45 35 37.5 27.5C30 20 32.5 12.5 32.5 12.5C32.5 12.5 30 14 27.5 14C25 14 25 12.5 25 12.5C25 12.5 25 14 22.5 14C20 14 17.5 12.5 17.5 12.5C17.5 12.5 20 20 12.5 27.5C5 35 12.5 45 12.5 45C22.5 37.5 25 25 25 25C27.5 37.5 35 40 35 40C37.5 30 31 25 27.5 20C22.5 12.5 25 5 25 5Z" fill="#DAA520"/>
              <circle cx="20" cy="17.5" r="1" fill="black"/>
              <circle cx="30" cy="17.5" r="1" fill="black"/>
              <path d="M22.5 22.5C22.5 22.5 25 23 27.5 22.5" stroke="black" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold cursor-pointer">
            <span className="text-black">CV</span><span className="text-[#DAA520]">Cat</span>
          </span>
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
