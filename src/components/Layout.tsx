import { ReactNode } from "react";
import { Link } from "wouter";

import Navbar from "./Navbar";
import { useAuth } from "@/lib/auth-context";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-50 py-8 px-4 md:px-8 mt-auto border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
            <Link
              href="/team"
              className="text-sm text-gray-600 hover:text-[#DAA520] transition-colors"
            >
              Team
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-[#DAA520] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-[#DAA520] transition-colors"
            >
              Terms
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} CVCat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
