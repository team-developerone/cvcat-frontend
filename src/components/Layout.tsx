import { ReactNode } from "react";

import Navbar from "./Navbar";
import { useAuth } from "@/lib/auth-context";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function Layout({
  children,
  showFooter = false
}: LayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        {children}
      </main>

      {showFooter && (
        <footer className="bg-gray-50 py-8 px-4 md:px-8 mt-auto">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} CVCat. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
