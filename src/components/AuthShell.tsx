import React from 'react';

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthShell: React.FC<AuthShellProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen bg-[#090713] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* خلفية النجوم والتوهج البسيط */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#090713] to-[#090713]"></div>
      
      <div className="w-full max-w-md space-y-6 z-10">
        {/* الشعار الأعلى */}
        <div className="text-center space-y-1">
          <div className="text-4xl text-purple-400 font-bold tracking-tighter">∞</div>
          <div className="text-2xl font-bold tracking-widest text-white">RANX</div>
        </div>

        {/* الكارت الرئيسي */}
        <div className="bg-[#120e24]/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-xs text-slate-400">{description}</p>
          </div>
          {children}
        </div>

        {/* التوقيع السفلي */}
        <div className="text-center text-[10px] text-slate-500 uppercase tracking-widest space-y-0.5">
          <div>made by</div>
          <div className="text-slate-400 font-medium">ZIDAN</div>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
