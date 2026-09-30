import React from "react";
import { AuthShell } from "../components/AuthShell";
import { FormField } from "../components/FormField";
import { RanxLogo } from "../components/RanxLogo";

export const LoginPage: React.FC = () => {
  return (
    <AuthShell title="مرحبًا بعودتك" description="سجّل الدخول إلى مساحتك في RANX">
      <div className="flex justify-center mb-6">
        <RanxLogo size="lg" />
      </div>
      <form className="space-y-4">
        <FormField label="اسم المستخدم" placeholder="---" />
        <FormField label="كلمة المرور" type="password" placeholder="---" />
        <button
          type="submit"
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>تسجيل الدخول</span>
          <span>←</span>
        </button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
