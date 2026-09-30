import React from 'react';
import { Link } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { FormField } from '../components/FormField';

export const LoginPage: React.FC = () => {
  return (
    <AuthShell title="مرحبًا بعودتك" description="سجّل الدخول إلى مساحتك في RANX">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FormField label="اسم المستخدم" placeholder="---" />
        <FormField label="كلمة المرور" type="password" placeholder="---" />
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium rounded-xl transition-all flex items-center justify-center relative mt-2"
        >
          <span>تسجيل الدخول</span>
          <span className="absolute left-4">←</span>
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-400">
        مستخدم جديد؟{' '}
        <Link to="/register" className="text-purple-300 hover:underline">
          أنشئ حسابًا
        </Link>
      </div>
    </AuthShell>
  );
};

export default LoginPage;
