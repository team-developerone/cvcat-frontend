import { motion } from "framer-motion";

interface LogoProps {
  size?: "small" | "medium" | "large";
  variant?: "full" | "icon";
  animated?: boolean;
  className?: string;
}

export default function LogoMinimal({ 
  size = "medium", 
  variant = "full", 
  animated = false,
  className = ""
}: LogoProps) {
  // Define size values
  const sizes = {
    small: {
      width: variant === "full" ? 100 : 24,
      height: variant === "full" ? 30 : 24,
      iconSize: 20,
      fontSize: 16,
      letterSpacing: 1
    },
    medium: {
      width: variant === "full" ? 140 : 36,
      height: variant === "full" ? 42 : 36, 
      iconSize: 30,
      fontSize: 22,
      letterSpacing: 1.5
    },
    large: {
      width: variant === "full" ? 200 : 48,
      height: variant === "full" ? 60 : 48,
      iconSize: 40,
      fontSize: 30,
      letterSpacing: 2
    }
  };

  const { width, height, iconSize, fontSize, letterSpacing } = sizes[size];

  // Animation props for the logo
  const logoAnimationProps = animated ? {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 15,
      delay: 0.1 
    }
  } : {};

  // More geometric minimalist SVG for the icon
  if (variant === "icon") {
    return (
      <motion.div 
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width, height }}
        {...logoAnimationProps}
      >
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main circular face */}
          <circle cx="12" cy="12" r="7" fill="#DAA520" />
          
          {/* Triangular ears */}
          <path d="M8 7L12 12L5 12L8 7Z" fill="#DAA520" />
          <path d="M16 7L12 12L19 12L16 7Z" fill="#DAA520" />
          
          {/* Eyes */}
          <circle cx="9.5" cy="10.5" r="1" fill="black" />
          <circle cx="14.5" cy="10.5" r="1" fill="black" />
          
          {/* Document lines */}
          <rect x="8" y="14" width="8" height="2" rx="1" fill="white" fillOpacity="0.6" />
          <rect x="9" y="17" width="6" height="1" rx="0.5" fill="white" fillOpacity="0.6" />
        </svg>
      </motion.div>
    );
  }

  // Full logo with text
  return (
    <motion.div 
      className={`inline-flex items-center ${className}`}
      style={{ width, height }}
      {...logoAnimationProps}
    >
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        {/* Main circular face */}
        <circle cx="12" cy="12" r="7" fill="#DAA520" />
        
        {/* Triangular ears */}
        <path d="M8 7L12 12L5 12L8 7Z" fill="#DAA520" />
        <path d="M16 7L12 12L19 12L16 7Z" fill="#DAA520" />
        
        {/* Eyes */}
        <circle cx="9.5" cy="10.5" r="1" fill="black" />
        <circle cx="14.5" cy="10.5" r="1" fill="black" />
        
        {/* Document lines */}
        <rect x="8" y="14" width="8" height="2" rx="1" fill="white" fillOpacity="0.6" />
        <rect x="9" y="17" width="6" height="1" rx="0.5" fill="white" fillOpacity="0.6" />
      </svg>

      <div className="font-medium tracking-wider">
        <span 
          className="font-bold"
          style={{ 
            fontSize: fontSize,
            letterSpacing: letterSpacing + "px"
          }}
        >
          <span className="font-light tracking-normal">cv</span>
          <span className="text-[#DAA520] font-semibold">cat</span>
        </span>
      </div>
    </motion.div>
  );
}