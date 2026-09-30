import React from 'react';

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthShell: React.FC<AuthShellProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen bg-[#07050e] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* عناصر خلفية متوهجة ومتحركة */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/15 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px]"></div>

      <div className="w-full max-w-md space-y-6 z-10">
        {/* اللوجو والعنوان علويًا */}
        <div className="text-center space-y-1">
          <div className="inline-block text-4xl text-purple-400 font-extrabold drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-bounce">
            ∞
          </div>
          <h1 className="text-3xl font-black tracking-widest bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
            RANX
          </h1>
        </div>

        {/* الكارت الرئيسي بأسلوب Glassmorphism */}
        <div className="bg-[#100d1d]/80 border border-purple-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white/90">{title}</h2>
            <p className="text-xs text-slate-400">{description}</p>
          </div>

          {children}
        </div>

        {/* التوقيع السفلي */}
        <div className="text-center text-[10px] tracking-widest text-slate-500 uppercase">
          made by <span className="text-slate-300 font-semibold">ZIDAN</span>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
