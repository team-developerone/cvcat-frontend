import React from 'react';

interface LogoMinimalProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function LogoMinimal({ className = "", size = "md", color = "#DAA520" }: LogoMinimalProps) {
  // Size mapping
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Semi-circular frame */}
        <path 
          d="M10 50 A 40 40 0 1 0 90 50" 
          stroke={color}
          strokeWidth="6"
        />
        
        {/* Cat head shape - simplified, icon-only version */}
        <path 
          d="M25 75 L 75 75 C 78 55 75 40 50 40 C 25 40 22 55 25 75 Z" 
          fill={color}
        />
        
        {/* Left ear */}
        <path 
          d="M30 42 L 15 20 L 45 30 Z" 
          fill={color}
        />
        
        {/* Right ear */}
        <path 
          d="M70 42 L 85 20 L 55 30 Z" 
          fill={color}
        />
      </svg>
    </div>
  );
}