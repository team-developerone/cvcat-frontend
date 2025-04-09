import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [location] = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <a className="text-2xl font-bold cursor-pointer">
            <span className="text-black">CV</span><span className="text-[#DAA520]">Cat</span>
          </a>
        </Link>
      </div>
      
      {!isAuthenticated ? (
        // Public navbar
        <div className="space-x-4 flex items-center">
          <a href="#features" className="text-black hover:text-[#DAA520] transition-all">Features</a>
          <a href="#pricing" className="text-black hover:text-[#DAA520] transition-all">Pricing</a>
          <a href="#" className="text-black hover:text-[#DAA520] transition-all">About</a>
          <Link href="/auth">
            <Button
              variant="default"
              className="bg-black text-white hover:bg-[#DAA520] transition-all"
            >
              Sign In
            </Button>
          </Link>
        </div>
      ) : (
        // Authenticated navbar
        <div className="flex items-center space-x-4">
          {location === "/cv-management" ? (
            <Link href="/cv-builder">
              <Button
                variant="default"
                className="bg-black text-white hover:bg-[#DAA520] transition-all"
              >
                Create New CV
              </Button>
            </Link>
          ) : location === "/cv-builder" ? (
            <Link href="/cv-management">
              <Button
                variant="default"
                className="bg-black text-white hover:bg-[#DAA520] transition-all"
              >
                Save & Exit
              </Button>
            </Link>
          ) : null}
          <div className="relative">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="fas fa-user text-gray-600"></i>
              </div>
              <span className="hidden md:inline">John Doe</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
