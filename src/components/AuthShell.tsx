import React from 'react';

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthShell: React.FC<AuthShellProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen bg-[#0b0914] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 z-10">
        <div className="text-center space-y-2">
          <div className="text-4xl text-purple-400 font-bold">∞</div>
          <span className="text-3xl font-bold tracking-wider text-white">RANX</span>
        </div>
        <div className="bg-[#13111c] border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
