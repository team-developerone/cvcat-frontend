import { motion } from "framer-motion";

interface LogoProps {
  size?: "small" | "medium" | "large";
  variant?: "full" | "icon";
  animated?: boolean;
  className?: string;
  colorScheme?: "gold" | "black" | "white";
}

export default function LogoSleek({ 
  size = "medium", 
  variant = "full", 
  animated = false,
  className = "",
  colorScheme = "gold"
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
      fontSize: 24,
      letterSpacing: 2
    },
    large: {
      width: variant === "full" ? 200 : 48,
      height: variant === "full" ? 60 : 48,
      iconSize: 40,
      fontSize: 32,
      letterSpacing: 3
    }
  };

  const { width, height, iconSize, fontSize, letterSpacing } = sizes[size];

  // Color schemes
  const colors = {
    gold: {
      primary: "#DAA520",
      secondary: "#000000",
      accent: "#FFFFFF"
    },
    black: {
      primary: "#000000",
      secondary: "#666666",
      accent: "#FFFFFF"
    },
    white: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
      accent: "#000000"
    }
  };

  const { primary, secondary, accent } = colors[colorScheme];

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

  // Animation for the SVG elements
  const svgAnimations = animated ? {
    initial: { 
      pathLength: 0,
      opacity: 0
    },
    animate: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.2, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: 0.2, duration: 0.8 }
      } 
    }
  } : {};

  // Ultra minimalist icon version
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
          {/* Abstract cat shape */}
          <motion.path 
            d="M12 4L5 12H19L12 4Z" 
            fill={primary}
            {...svgAnimations}
          />
          <motion.path 
            d="M5 12C5 16.4183 8.13401 20 12 20C15.866 20 19 16.4183 19 12H5Z" 
            fill={primary}
            {...svgAnimations}
          />
          
          {/* Minimalist eyes */}
          <motion.circle cx="9" cy="14" r="1" fill={accent} {...svgAnimations} />
          <motion.circle cx="15" cy="14" r="1" fill={accent} {...svgAnimations} />
          
          {/* Document lines */}
          <motion.rect x="8" y="17" width="8" height="1" rx="0.5" fill={accent} fillOpacity="0.8" {...svgAnimations} />
          <motion.rect x="10" y="19" width="4" height="0.5" rx="0.25" fill={accent} fillOpacity="0.6" {...svgAnimations} />
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
        className="mr-3"
      >
        {/* Abstract cat shape */}
        <motion.path 
          d="M12 4L5 12H19L12 4Z" 
          fill={primary}
          {...svgAnimations}
        />
        <motion.path 
          d="M5 12C5 16.4183 8.13401 20 12 20C15.866 20 19 16.4183 19 12H5Z" 
          fill={primary}
          {...svgAnimations}
        />
        
        {/* Minimalist eyes */}
        <motion.circle cx="9" cy="14" r="1" fill={accent} {...svgAnimations} />
        <motion.circle cx="15" cy="14" r="1" fill={accent} {...svgAnimations} />
        
        {/* Document lines */}
        <motion.rect x="8" y="17" width="8" height="1" rx="0.5" fill={accent} fillOpacity="0.8" {...svgAnimations} />
        <motion.rect x="10" y="19" width="4" height="0.5" rx="0.25" fill={accent} fillOpacity="0.6" {...svgAnimations} />
      </svg>

      <div className="font-normal">
        <span 
          style={{ 
            fontSize: fontSize,
            letterSpacing: letterSpacing + "px",
            lineHeight: 1
          }}
          className="flex items-baseline"
        >
          <span className="text-black font-light tracking-normal" style={{ fontSize: fontSize * 0.9 }}>cv</span>
          <span className="font-semibold" style={{ color: primary }}>cat</span>
        </span>
      </div>
    </motion.div>
  );
}