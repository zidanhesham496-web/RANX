import { Bell, BookCopy, Lock, User } from "lucide-react";
import { useState } from "react";
import { useHomeData } from "../../hooks/useHomeData";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { SettingsGroup } from "./SettingsGroup";
import { SettingsRow } from "./SettingsRow";
import { SettingsToggle } from "./SettingsToggle";

const NOTIFICATIONS = [
  { key: "tasks", icon: Bell, title: "Task Reminders" },
  { key: "academic", icon: Bell, title: "Academic Reminders" },
] as const;

type NotifKey = (typeof NOTIFICATIONS)[number]["key"];
type RowKey = "username" | "password" | "subjects";

// TEMP: notification toggles are local only.
export function ProfileSections({ username }: { username: string }) {
  const [open, setOpen] = useState<RowKey | null>(null);
  const [pwKey, setPwKey] = useState(0);
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({ tasks: true, academic: true });
  const { subjects } = useHomeData();

  const toggle = (key: RowKey) => setOpen((cur) => (cur === key ? null : key));
  const closePassword = () => {
    setOpen(null);
    window.setTimeout(() => setPwKey((k) => k + 1), 350);
  };

  return (
    <div className="space-y-6">
      <SettingsGroup title="Account">
        <SettingsRow
          icon={User}
          title="Username"
          subtitle={`@${username}`}
          expanded={open === "username"}
          onClick={() => toggle("username")}
        >
          <p className="text-[13px] text-[#8d8a9e]">
            Your username is used to sign in and can't be changed here.
          </p>
        </SettingsRow>
        <SettingsRow
          icon={Lock}
          title="Password & Security"
          expanded={open === "password"}
          onClick={() => toggle("password")}
        >
          <ChangePasswordForm key={pwKey} username={username} onDone={closePassword} />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup title="Academic Preferences">
        <SettingsRow
          icon={BookCopy}
          title="My Subjects"
          expanded={open === "subjects"}
          onClick={() => toggle("subjects")}
        >
          <ul className="space-y-2">
            {subjects.map((s) => (
              <li
                key={s.code}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
              >
                <span
                  className="grid size-9 place-items-center rounded-lg border text-[11px] font-semibold"
                  style={{ color: s.accent, borderColor: `${s.accent}55`, background: `${s.accent}1f` }}
                >
                  {s.abbr}
                </span>
                <span className="text-[14px] text-white">{s.name}</span>
              </li>
            ))}
          </ul>
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup title="Notifications">
        {NOTIFICATIONS.map((n) => (
          <SettingsToggle
            key={n.key}
            icon={n.icon}
            title={n.title}
            checked={notifs[n.key]}
            onChange={(next: boolean) => setNotifs((prev) => ({ ...prev, [n.key]: next }))}
          />
        ))}
      </SettingsGroup>
    </div>
  );
}
