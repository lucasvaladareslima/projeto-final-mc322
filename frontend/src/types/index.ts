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
  grade: number;    // Nota final
  credits: number;
}