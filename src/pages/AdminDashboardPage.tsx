import { DashboardShell } from "../components/DashboardShell";

export default function AdminDashboardPage() {
  return (
    <DashboardShell eyebrow="صلاحيات الإدارة" title="لوحة التحكم">
      <section className="admin-panel">
        <span className="panel-index">01 <span /> وصول إداري</span>
        <h2>مرحبًا في مساحة الإدارة.</h2>
        <p>تم التحقق من صلاحية حسابك. ستظهر أدوات الإدارة هنا مع توسع RANX.</p>
        <div className="admin-access"><span className="status-dot" /> تم التحقق من دور المدير</div>
      </section>
    </DashboardShell>
  );
}