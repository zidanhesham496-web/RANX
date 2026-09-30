import React from 'react';

interface RanxLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RanxLogo: React.FC<RanxLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-14',
    lg: 'h-20',
  };

  return (
    <div className={`flex flex-col items-center justify-center my-2 ${className}`}>
      <div className="relative group cursor-pointer">
        {/* خلفية توهج النيون الفخمة */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 rounded-lg blur-lg opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
        
        {/* صورة اللوجو الأساسية */}
        <img 
          src="/ranx-logo.png" 
          alt="RANX Logo" 
          className={`relative ${sizeClasses[size]} w-auto object-contain transition-all duration-300 transform group-hover:scale-105`}
        />
      </div>
    </div>
  );
};

export default RanxLogo;
