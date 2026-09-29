import { DashboardShell } from "../components/DashboardShell";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { profile } = useAuth();

  return (
    <DashboardShell eyebrow="مساحة المستخدم" title={`أهلًا، ${profile?.name ?? ""}`}>
      <section className="welcome-panel">
        <div className="welcome-copy">
          <span className="panel-index">01 <span /> مساحة شخصية</span>
          <h2>كل شيء يبدأ<br />من هنا.</h2>
          <p>هذه مساحتك الخاصة في RANX. أساس هادئ للعمل القادم.</p>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-ring ring-outer" />
          <div className="art-ring ring-inner" />
          <div className="art-core">R</div>
        </div>
      </section>
      <section className="profile-strip" aria-label="بيانات الحساب">
        <div><span>اسم المستخدم</span><strong>@{profile?.username}</strong></div>
        <div><span>رقم الهاتف</span><strong>{profile?.phone_number}</strong></div>
        <div><span>نوع الحساب</span><strong>مستخدم</strong></div>
      </section>
    </DashboardShell>
  );
}