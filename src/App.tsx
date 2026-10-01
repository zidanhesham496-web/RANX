import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthCard } from './components/auth/AuthCard';
import { ParticleBackground } from './components/ParticleBackground';
import { LogOut, User, Phone, AtSign, ShieldCheck } from 'lucide-react';

interface UserProfile {
  name?: string;
  phone?: string;
  username: string;
  email?: string;
}

export function App() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const metadata = session.user.user_metadata || {};
        setUserProfile({
          name: metadata.name || 'User',
          phone: metadata.phone || '',
          username: metadata.username || session.user.email?.split('@')[0] || '',
          email: session.user.email,
        });
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const metadata = session.user.user_metadata || {};
        setUserProfile({
          name: metadata.name || 'User',
          phone: metadata.phone || '',
          username: metadata.username || session.user.email?.split('@')[0] || '',
          email: session.user.email,
        });
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formattedEmail = `${formData.username.trim().toLowerCase()}@ranx.app`;

    try {
      if (authMode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formattedEmail,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              phone: formData.phone,
              username: formData.username,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          setUserProfile({
            name: formData.name,
            phone: formData.phone,
            username: formData.username,
            email: formattedEmail,
          });
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formattedEmail,
          password: formData.password,
        });

        if (signInError) throw signInError;

        if (data.user) {
          const metadata = data.user.user_metadata || {};
          setUserProfile({
            name: metadata.name || formData.username,
            phone: metadata.phone || '',
            username: metadata.username || formData.username,
            email: data.user.email,
          });
        }
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      setError(err.message || 'حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    setFormData({ name: '', phone: '', username: '', password: '' });
  };

  const handleToggleMode = () => {
    setError(null);
    setAuthMode((prev) => (prev === 'login' ? 'signup' : 'login'));
  };

  return (
    <div className="min-h-screen w-full bg-[#05070c] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Interactive Neon Constellation Network Background */}
      <ParticleBackground />

      {/* Background Ambient Illumination Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-purple-900/15 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-900/10 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Logged In View */}
      {userProfile ? (
        <div className="w-full max-w-[440px] p-8 rounded-3xl bg-[#0b0d14]/90 backdrop-blur-2xl border border-purple-500/30 shadow-[0_0_50px_rgba(147,51,234,0.2)] text-center animate-fade-in relative z-10" dir="ltr">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <ShieldCheck size={32} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            Welcome, {userProfile.name || userProfile.username}!
          </h2>
          <p className="text-xs text-purple-400 font-medium mb-6">
            Account Authenticated via RANX Supabase
          </p>

          <div className="space-y-3 text-left bg-[#121624]/70 p-4 rounded-2xl border border-slate-800/80 mb-6 text-sm">
            <div className="flex items-center gap-3 text-slate-300">
              <User size={16} className="text-purple-400" />
              <span>Name: <strong className="text-white">{userProfile.name || 'N/A'}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <AtSign size={16} className="text-purple-400" />
              <span>Username: <strong className="text-white">@{userProfile.username}</strong></span>
            </div>
            {userProfile.phone && (
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={16} className="text-purple-400" />
                <span>Phone: <strong className="text-white">{userProfile.phone}</strong></span>
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-3 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        /* Auth Card Component */
        <AuthCard
          mode={authMode}
          onSubmit={handleSubmit}
          onToggleMode={handleToggleMode}
          loading={loading}
          error={error}
          formData={formData}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default App;
