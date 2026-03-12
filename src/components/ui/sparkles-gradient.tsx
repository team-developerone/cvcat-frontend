import React from "react";

interface SparklesGradientProps {
  className?: string;
}

/** Sparkles icon with animated gradient stroke - matches Lucide Sparkles shape */
export default function SparklesGradient({ className = "w-3.5 h-3.5" }: SparklesGradientProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#ai-sparkle-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <defs>
        <linearGradient id="ai-sparkle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DAA520" stopOpacity="1">
            <animate
              attributeName="stop-color"
              values="#DAA520;#f0e68c;#DAA520"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#f0e68c" stopOpacity="1">
            <animate
              attributeName="stop-color"
              values="#f0e68c;#DAA520;#f0e68c"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#DAA520" stopOpacity="1">
            <animate
              attributeName="stop-color"
              values="#DAA520;#f0e68c;#DAA520"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}
