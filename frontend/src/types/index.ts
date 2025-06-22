export interface Subject {
  code: string;
  name: string;
  credits: number;
  prerequisites: string;
  area: string;
}

export interface Task {
  name: string;
  subject: string;
  dueDate: string;
}

export interface DisciplineButtonProps {
  icon: string;
  label: string;
  href: string;
}

// Dentro de src/types/index.ts

export interface CurrentSubject {
  id: string; // Um ID único para usar como chave e no link
  name: string;
  code: string;
  class: string; // Turma
  credits: number;
  professor: string;
}

export interface PastSubject {
  code: string;
  name: string;
  semester: string; // Ex: "2024/2"
  grade: number; // Nota final
  credits: number;
}

export interface Material {
  title: string;
  url: string;
}

export interface Notice {
  title: string;
  message: string;
  date: string;
}

export interface Classroom {
  subject: Subject;
  class: string;
  teacher: string;
  materials: Material[];
  tasks: Task[];
  notices: Notice[];
}

export interface ForumMessage {
  title: string;
  content: string;
  author: string;
  timestamp: string;
  // replies: ForumMessage[];
}
