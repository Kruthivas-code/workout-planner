import type { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({ size = 32, ...props }: LogoSvgProps) => {
  return (
    <svg height={size} viewBox="0 0 100 100" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Arm outline */}
      <path d="M30 35 Q28 32 32 28 Q36 26 40 28 Q44 30 48 34 Q52 38 56 44 Q60 50 64 56 Q68 62 70 68 Q72 74 70 80 Q68 86 64 90 Q60 94 54 96 Q48 98 42 96 Q36 94 32 90 Q28 86 26 80 Q24 74 26 68 Q28 62 30 56 Z" 
            fill="currentColor" 
            opacity="0.9"/>
      
      {/* Bicep muscle highlight */}
      <ellipse cx="40" cy="56" rx="8" ry="12" 
               fill="currentColor" 
               opacity="0.6"/>
      
      {/* Dumbbell */}
      <g transform="translate(56, 40)">
        {/* Dumbbell handle */}
        <rect x="0" y="4" width="16" height="2.4" 
              fill="currentColor" 
              opacity="0.8"
              rx="1.2"/>
        
        {/* Left weight */}
        <rect x="-3" y="1.6" width="4" height="7.2" 
              fill="currentColor" 
              opacity="0.9"
              rx="0.8"/>
        
        {/* Right weight */}
        <rect x="15" y="1.6" width="4" height="7.2" 
              fill="currentColor" 
              opacity="0.9"
              rx="0.8"/>
      </g>
      
      {/* Hand/grip */}
      <ellipse cx="70" cy="44" rx="5" ry="3" 
               fill="currentColor" 
               opacity="0.7"/>
      
      {/* Muscle definition lines */}
      <path d="M34 50 Q38 52 42 50" 
            stroke="currentColor" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.4"/>
      
      <path d="M36 60 Q40 62 44 60" 
            stroke="currentColor" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.4"/>
    </svg>
  );
};
