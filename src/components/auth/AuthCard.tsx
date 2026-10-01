import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Infinity } from 'lucide-react';

interface AuthCardProps {
  mode: 'login' | 'signup';
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
  loading?: boolean;
  error?: string | null;
  formData: {
    name?: string;
    phone?: string;
    username: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  mode,
  onSubmit,
  onToggleMode,
  loading = false,
  error = null,
  formData,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === 'login';

  const inputStyle =
    "w-full px-4 py-3.5 rounded-xl bg-[#121624]/80 border border-slate-700/60 text-slate-100 text-sm placeholder-slate-500 transition-all duration-300 ease-out transform focus:-translate-y-1 focus:bg-[#181e31] focus:border-purple-400 focus:shadow-[0_10px_25px_-5px_rgba(168,85,247,0.4),0_0_15px_rgba(168,85,247,0.3)] focus:outline-none";

  return (
    <div className="w-full max-w-[420px] mx-auto p-2 relative z-10" dir="ltr">
      {/* Container Card with Refined Glassmorphism */}
      <div className="relative rounded-3xl bg-[#0b0d14]/85 backdrop-blur-2xl border border-purple-500/20 p-8 shadow-[0_0_60px_rgba(76,29,149,0.3)]">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center justify-center gap-3 mb-2">
            
            {/* 3D Purple Metallic Infinity Icon Container */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1a1033] to-[#0d071a] border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.3)] group">
              <div className="absolute inset-0 bg-purple-600/20 blur-md rounded-2xl" />
              <Infinity className="w-8 h-8 relative text-purple-300 drop-shadow-[0_2px_10px_rgba(192,132,252,0.9)]" />
            </div>

            {/* Precision Synchronized Vector Logotype: RANX */}
            <div className="h-12 my-1 flex items-center justify-center select-none">
              <svg
                viewBox="0 0 232 65"
                className="h-11 sm:h-12 w-auto drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ranSilverMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#E2E8F0" />
                    <stop offset="70%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  <linearGradient id="ranTopHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.2" />
                  </linearGradient>

                  <linearGradient id="xFacetTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#7E22CE" />
                  </linearGradient>

                  <linearGradient id="xFacetTopRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E879F9" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#581C87" />
                  </linearGradient>

                  <linearGradient id="xFacetBottomLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="60%" stopColor="#6B21A8" />
                    <stop offset="100%" stopColor="#3B0764" />
                  </linearGradient>

                  <linearGradient id="xFacetBottomRight" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#7E22CE" />
                    <stop offset="70%" stopColor="#4C1D95" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                  </linearGradient>

                  <filter id="xGlow3D" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#c084fc" floodOpacity="0.8" />
                  </filter>
                </defs>

                <g fill="url(#ranSilverMetal)" stroke="#0f172a" strokeWidth="0.8" strokeLinejoin="round">
                  <path d="M 10 55 V 10 H 38 C 48 10 54 17 52 27 C 50 34 44 37 36 37 L 54 55 H 39 L 26 37 H 22 V 55 H 10 Z M 22 19 V 28 H 36 C 40 28 42 26 42 23.5 C 42 21 40 19 36 19 H 22 Z" fillRule="evenodd" />
                  <path d="M 66 55 L 82 10 H 94 L 110 55 H 96 L 88 28 L 80 55 H 66 Z" />
                  <path d="M 122 55 V 10 H 134 L 154 42 V 10 H 166 V 55 H 154 L 134 23 V 55 H 122 Z" />
                </g>

                <path d="M 10 10 H 38" stroke="url(#ranTopHighlight)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 82 10 H 94" stroke="url(#ranTopHighlight)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 122 10 H 134" stroke="url(#ranTopHighlight)" strokeWidth="1.5" strokeLinecap="round" />

                <g filter="url(#xGlow3D)">
                  <polygon points="178,10 190,10 200,32.5 192,32.5" fill="url(#xFacetTopLeft)" stroke="#f0abfc" strokeWidth="0.3" />
                  <polygon points="178,10 192,32.5 200,32.5" fill="url(#xFacetBottomLeft)" stroke="#c084fc" strokeWidth="0.3" />
                  <polygon points="210,10 222,10 208,32.5 200,32.5" fill="url(#xFacetTopRight)" stroke="#f472b6" strokeWidth="0.3" />
                  <polygon points="222,10 208,32.5 200,32.5" fill="url(#xFacetBottomRight)" stroke="#7e22ce" strokeWidth="0.3" />
                  <polygon points="222,55 210,55 200,32.5 208,32.5" fill="url(#xFacetTopRight)" stroke="#a855f7" strokeWidth="0.3" />
                  <polygon points="222,55 208,32.5 200,32.5" fill="url(#xFacetBottomRight)" stroke="#3b0764" strokeWidth="0.3" />
                  <polygon points="178,55 190,55 192,32.5 200,32.5" fill="url(#xFacetTopLeft)" stroke="#c084fc" strokeWidth="0.3" />
                  <polygon points="178,55 192,32.5 200,32.5" fill="url(#xFacetBottomLeft)" stroke="#581c87" strokeWidth="0.3" />
                  <polygon points="200,28.5 204.5,32.5 200,36.5 195.5,32.5" fill="#FFFFFF" opacity="0.85" />
                </g>
              </svg>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.22em] font-semibold text-slate-400 uppercase mt-2">
            MATERIALS • ORGANIZED • ACCESSIBLE
          </p>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-normal">
            {isLogin
              ? 'Your college materials, all in one place.'
              : 'Join RANX to access all your study materials.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Body with 3D Elevated Focus Inputs */}
        <form onSubmit={onSubmit} className="space-y-4" dir="ltr">
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={onChange}
                  required={!isLogin}
                  placeholder="Full Name"
                  className={inputStyle}
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={onChange}
                  required={!isLogin}
                  placeholder="Phone Number"
                  className={inputStyle}
                />
              </div>
            </>
          )}

          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={onChange}
              required
              placeholder="Username"
              className={inputStyle}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              placeholder="Password"
              className={`${inputStyle} pl-4 pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors z-10"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(147,51,234,0.35)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-purple-200" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isLogin ? 'Log In' : 'Create Account'}</span>
              )}
            </button>
          </div>
        </form>

        {/* Auth Mode Toggle */}
        <div className="mt-8 text-center" dir="ltr">
          <p className="text-xs text-slate-400 font-sans">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors ml-1"
            >
              {isLogin ? 'Create Account' : 'Log In'}
            </button>
          </p>
        </div>

        {/* Footer Signature: Made by ZIDAN */}
        <div className="mt-8 pt-5 border-t border-slate-800/60 flex flex-col items-center justify-center gap-0.5 select-none" dir="ltr">
          <span className="text-[10px] tracking-[0.25em] font-medium text-slate-300 uppercase">
            made by
          </span>
          <span className="text-sm font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-400 to-amber-600 drop-shadow-[0_0_12px_rgba(234,179,8,0.45)]">
            ZIDAN
          </span>
        </div>

      </div>
    </div>
  );
};
