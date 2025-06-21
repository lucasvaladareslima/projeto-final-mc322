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
