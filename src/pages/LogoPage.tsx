import React from 'react';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';
import LogoMinimal from '@/components/LogoMinimal';
import LogoSleek from '@/components/LogoSleek';
import LogoShowcase from '@/components/LogoShowcase';
import { useLocation } from 'wouter';

export default function LogoPage() {
  const [_, navigate] = useLocation();

  return (
    <Layout showFooter={true}>
      <div className="py-10 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Logo Showcase</h1>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Standard Logo</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <Logo size="sm" />
                <div className="mt-4 text-sm text-gray-500">Small</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <Logo size="md" />
                <div className="mt-4 text-sm text-gray-500">Medium</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <Logo size="lg" />
                <div className="mt-4 text-sm text-gray-500">Large</div>
              </div>
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Minimal Logo</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoMinimal size="sm" />
                <div className="mt-4 text-sm text-gray-500">Small</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoMinimal size="md" />
                <div className="mt-4 text-sm text-gray-500">Medium</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoMinimal size="lg" />
                <div className="mt-4 text-sm text-gray-500">Large</div>
              </div>
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Sleek Logo</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoSleek size="sm" />
                <div className="mt-4 text-sm text-gray-500">Small</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoSleek size="md" />
                <div className="mt-4 text-sm text-gray-500">Medium</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoSleek size="lg" />
                <div className="mt-4 text-sm text-gray-500">Large</div>
              </div>
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Dark Mode Variant</h2>
            <div className="p-6 bg-gray-800 rounded-lg flex justify-center">
              <LogoSleek darkMode={true} size="lg" />
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Logo Showcase</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoShowcase variant="default" />
                <div className="mt-4 text-sm text-gray-500">Default</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoShowcase variant="minimal" />
                <div className="mt-4 text-sm text-gray-500">Minimal</div>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center">
                <LogoShowcase variant="sleek" />
                <div className="mt-4 text-sm text-gray-500">Sleek</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-black hover:bg-[#DAA520] text-white rounded-md transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}