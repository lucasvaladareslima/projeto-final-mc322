export interface Subject {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  creditos: number;
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
  id: number;
  titulo: string;
  conteudo: string;
  autor: User;
  data_criacao: string;
  tags: string[];
  comentarios: ForumMessage[]; // Permite que uma mensagem tenha comentários, criando uma estrutura de árvore
  // replies: ForumMessage[];
}

export interface User {
  public_id: string;
  name: string;
  email: string;
  type: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface ProfessorClass {
  id: string; // ID único da turma, para usarmos no link
  name: string;
  code: string;
  classId: string; // O identificador da turma, ex: "A", "S"
}

export interface ProfessorPastClass {
  id: string;
  name: string;
  code: string;
  classId: string;
  semester: string; // A nova informação
}
