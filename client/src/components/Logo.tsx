import { motion } from "framer-motion";

interface LogoProps {
  size?: "small" | "medium" | "large";
  variant?: "full" | "icon";
  animated?: boolean;
  className?: string;
}

export default function Logo({ 
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

  // SVG for just the icon
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
          className="text-[#DAA520]"
        >
          {/* Cat face */}
          <path 
            d="M12 5C12 5 7 9 7 13C7 17 9 19 12 19C15 19 17 17 17 13C17 9 12 5 12 5Z" 
            fill="currentColor"
          />
          {/* Cat ears */}
          <path 
            d="M7 13C7 13 5 8 7 5C9 2 12 5 12 5" 
            fill="currentColor"
          />
          <path 
            d="M17 13C17 13 19 8 17 5C15 2 12 5 12 5" 
            fill="currentColor"
          />
          {/* Cat eyes */}
          <circle cx="9.5" cy="11.5" r="1.5" fill="black" />
          <circle cx="14.5" cy="11.5" r="1.5" fill="black" />
          {/* Whiskers */}
          <path 
            d="M4 12L7 13M20 12L17 13" 
            stroke="black" 
            strokeWidth="0.75" 
            strokeLinecap="round"
          />
          {/* Document overlay */}
          <path 
            d="M12 19V15H17C17 17 15 19 12 19Z" 
            fill="white" 
            fillOpacity="0.3"
          />
          <path 
            d="M12 19V15H7C7 17 9 19 12 19Z" 
            fill="white" 
            fillOpacity="0.3"
          />
          <line 
            x1="8" 
            y1="16" 
            x2="16" 
            y2="16" 
            stroke="black" 
            strokeWidth="0.5" 
            strokeLinecap="round"
          />
          <line 
            x1="9" 
            y1="17" 
            x2="15" 
            y2="17" 
            stroke="black" 
            strokeWidth="0.5" 
            strokeLinecap="round"
          />
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
        className="mr-2 text-[#DAA520]"
      >
        {/* Cat face */}
        <path 
          d="M12 5C12 5 7 9 7 13C7 17 9 19 12 19C15 19 17 17 17 13C17 9 12 5 12 5Z" 
          fill="currentColor"
        />
        {/* Cat ears */}
        <path 
          d="M7 13C7 13 5 8 7 5C9 2 12 5 12 5" 
          fill="currentColor"
        />
        <path 
          d="M17 13C17 13 19 8 17 5C15 2 12 5 12 5" 
          fill="currentColor"
        />
        {/* Cat eyes */}
        <circle cx="9.5" cy="11.5" r="1.5" fill="black" />
        <circle cx="14.5" cy="11.5" r="1.5" fill="black" />
        {/* Whiskers */}
        <path 
          d="M4 12L7 13M20 12L17 13" 
          stroke="black" 
          strokeWidth="0.75" 
          strokeLinecap="round"
        />
        {/* Document overlay */}
        <path 
          d="M12 19V15H17C17 17 15 19 12 19Z" 
          fill="white" 
          fillOpacity="0.3"
        />
        <path 
          d="M12 19V15H7C7 17 9 19 12 19Z" 
          fill="white" 
          fillOpacity="0.3"
        />
        <line 
          x1="8" 
          y1="16" 
          x2="16" 
          y2="16" 
          stroke="black" 
          strokeWidth="0.5" 
          strokeLinecap="round"
        />
        <line 
          x1="9" 
          y1="17" 
          x2="15" 
          y2="17" 
          stroke="black" 
          strokeWidth="0.5" 
          strokeLinecap="round"
        />
      </svg>

      <div>
        <span 
          className="font-bold tracking-wider"
          style={{ 
            fontSize: fontSize,
            letterSpacing: letterSpacing + "px"
          }}
        >
          cv<span className="text-[#DAA520]">cat</span>
        </span>
      </div>
    </motion.div>
  );
}