import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { Link } from "wouter";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  showFooter?: boolean;
}

export default function Layout({ 
  children, 
  isAuthenticated = false,
  showFooter = false
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && (
        <footer className="bg-gray-50 py-12 px-4 md:px-8 mt-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">CVCat</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">CV Templates</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Career Advice</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#DAA520] transition-all">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} CVCat. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
