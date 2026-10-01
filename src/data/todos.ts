import type { Task } from "../types/todo";

export const initialTasks: Task[] = [
  { id: 1, type: "LEC", subject: "BIO", title: "Vitamins", number: 2, completed: false },
  { id: 2, type: "LEC", subject: "ANATOMY", title: "Thoracic Limb", number: 3, completed: false },
  { id: 3, type: "SEC", subject: "PHYSIOLOGY", title: "Cardiac Cycle", number: 2, completed: false },
  { id: 4, type: "ASS", subject: "BIOCHEMISTRY", title: "Protein Assignment", completed: false },
  { id: 5, type: "LEC", subject: "HISTOLOGY", title: "Epithelial Tissue", number: 1, completed: true },
  { id: 6, type: "SEC", subject: "ANATOMY", title: "Skull Bones", number: 1, completed: true },
  { id: 7, type: "LEC", subject: "PHYSIOLOGY", title: "Membrane Potential", number: 4, completed: true },
  { id: 8, type: "ASS", subject: "BIO", title: "Cell Division Report", completed: true },
  { id: 9, type: "LEC", subject: "BIOCHEMISTRY", title: "Enzyme Kinetics", number: 5, completed: false },
  { id: 10, type: "SEC", subject: "BIO", title: "Microscope Practice", number: 3, completed: false },
  { id: 11, type: "LEC", subject: "ANATOMY", title: "Pelvic Limb", number: 4, completed: false },
  { id: 12, type: "ASS", subject: "PHYSIOLOGY", title: "Blood Pressure Worksheet", completed: false },
];
