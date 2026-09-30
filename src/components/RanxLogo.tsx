import React from 'react';

interface RanxLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RanxLogo: React.FC<RanxLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-20',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative group cursor-pointer">
        {/* توهج النيون الخلفي */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition duration-500"></div>
        
        {/* شعار RANX بالأكواد المباشرة Pure SVG */}
        <div className={`relative ${sizeClasses[size]} flex items-center justify-center select-none`}>
          <svg 
            viewBox="0 0 400 120" 
            className="h-full w-auto drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ranxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* حرف R */}
            <path d="M 20 90 L 20 30 L 70 30 C 85 30 95 40 95 52 C 95 65 85 72 70 72 L 45 72 L 80 90 Z M 45 48 L 45 58 L 65 58 C 70 58 75 55 75 53 C 75 50 70 48 65 48 Z" fill="url(#ranxGradient)" />
            
            {/* حرف A */}
            <path d="M 105 90 L 135 30 L 155 30 L 185 90 L 165 90 L 145 48 L 125 90 Z" fill="url(#ranxGradient)" />
            
            {/* حرف N */}
            <path d="M 195 90 L 195 30 L 215 30 L 245 72 L 245 30 L 265 30 L 265 90 L 245 90 L 215 48 L 215 90 Z" fill="url(#ranxGradient)" />
            
            {/* حرف X */}
            <path d="M 280 30 L 305 30 L 330 60 L 355 30 L 380 30 L 345 70 L 380 90 L 355 90 L 330 62 L 305 90 L 280 90 L 315 70 Z" fill="url(#ranxGradient)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RanxLogo;
