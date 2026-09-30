import React from 'react';
import { Link } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { FormField } from '../components/FormField';

export const LoginPage: React.FC = () => {
  return (
    <AuthShell title="مرحبًا بعودتك" description="سجّل الدخول إلى مساحتك في RANX">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FormField label="اسم المستخدم" placeholder="أدخل اسم المستخدم" />
        <FormField label="كلمة المرور" type="password" placeholder="••••••••" />
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
        >
          <span>تسجيل الدخول</span>
          <span className="text-lg">←</span>
        </button>
      </form>

      {/* الجزء السفلي للانتقال لإنشاء حساب */}
      <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800/60">
        ليس لديك حساب؟{' '}
        <Link 
          to="/register" 
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors underline underline-offset-4"
        >
          إنشاء حساب جديد
        </Link>
      </div>
    </AuthShell>
  );
};

export default LoginPage;
