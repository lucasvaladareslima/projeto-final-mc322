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