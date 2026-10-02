export interface SubjectMeta {
  code: string;
  name: string;
  abbr: string;
  accent: string;
}

const FALLBACK_ACCENT = "#a78bfa";

const SUBJECTS: Record<string, SubjectMeta> = {
  ANATOMY: { code: "ANATOMY", name: "Anatomy", abbr: "ANA", accent: "#a78bfa" },
  PHYSIOLOGY: { code: "PHYSIOLOGY", name: "Physiology", abbr: "PHY", accent: "#818cf8" },
  BIOCHEMISTRY: { code: "BIOCHEMISTRY", name: "Biochemistry", abbr: "BCH", accent: "#7dd3fc" },
  HISTOLOGY: { code: "HISTOLOGY", name: "Histology", abbr: "HIS", accent: "#c4b5fd" },
  BIO: { code: "BIO", name: "Biology", abbr: "BIO", accent: "#8edbc4" },
};

export function getSubjectMeta(code: string): SubjectMeta {
  const key = code.trim().toUpperCase();
  return (
    SUBJECTS[key] ?? {
      code: key,
      name: key.charAt(0) + key.slice(1).toLowerCase(),
      abbr: key.slice(0, 3),
      accent: FALLBACK_ACCENT,
    }
  );
}
