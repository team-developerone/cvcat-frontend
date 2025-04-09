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
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 10C25 10 28 16 24 22C21 26 16 30 18 38C18 38 24 36 25 26C25 26 27 36 35 42C35 42 41 34 35 28C29 22 31 16 31 16C31 16 28 17 25 17C22 17 19 16 19 16C19 16 21 22 15 28C9 34 15 42 15 42C23 36 25 26 25 26C26 36 32 38 32 38C34 30 29 26 26 22C22 16 25 10 25 10Z" fill={color}/>
      </svg>
    </div>
  );
}