import Layout from "@/components/Layout";
import AuthForms from "@/components/AuthForms";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function AuthPage() {
  const [, navigate] = useLocation();
  
  const handleLoginSuccess = () => {
    navigate('/import-selection');
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden relative">
        {/* Background vectors - abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          {/* Top left circle */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#DAA520]/5 rounded-full"></div>
          
          {/* Bottom right circle */}
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#DAA520]/5 rounded-full"></div>
          
          {/* Center pattern */}
          <svg className="absolute w-full h-full opacity-[0.02]" viewBox="0 0 100 100">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="0.5" cy="0.5" r="0.5" fill="#DAA520" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Diagonal lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="100" x2="100" y2="0" stroke="#DAA520" strokeWidth="0.5" />
              <line x1="20" y1="100" x2="100" y2="20" stroke="#DAA520" strokeWidth="0.5" />
              <line x1="40" y1="100" x2="100" y2="40" stroke="#DAA520" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        {/* Left side - Brand showcase */}
        <div className="hidden lg:flex lg:w-5/12 bg-black items-center justify-center p-8 relative overflow-hidden">
          <div className="relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Logo size="lg" darkMode={true} />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-bold text-white mb-6"
            >
              Create, manage, and perfect <br/> your professional CV
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-sm mx-auto text-gray-400"
            >
              <p>Unlock AI-powered CV building, smart customization, and personalized recommendations to make your application stand out.</p>
            </motion.div>
            
            {/* Decorative sparkles */}
            <div className="absolute top-20 left-10 opacity-20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#DAA520" />
              </svg>
            </div>
            <div className="absolute bottom-20 right-10 opacity-30">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#DAA520" />
              </svg>
            </div>
          </div>
          
          {/* Diagonal divider */}
          <div className="absolute top-0 right-0 h-full w-20 overflow-hidden">
            <div className="w-40 h-full bg-gradient-to-l from-white/5 to-transparent transform rotate-6 translate-x-10"></div>
          </div>
        </div>
        
        {/* Right side - Auth forms */}
        <div className="w-full lg:w-7/12 flex items-center justify-center p-4 md:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <AuthForms onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
