"use client";

import Button from "@/components/Button";
import { Classroom, Subject } from "@/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const subject: Subject = {
  code: "MC322",
  name: "Programação Orientada a Objetos",
  credits: 4,
  prerequisites: "MC202",
  area: "Área da Matéria",
};

const classroom: Classroom = {
  subject: subject,
  class: "C",
  teacher: "Marcos Raimundo",
  materials: [
    { title: "Material 1", url: "/materiais/material1.pdf" },
    { title: "Material 2", url: "/materiais/material2.pdf" },
    {
      title: "Apresentação da Aula 1",
      url: "/materiais/apresentacao-aula1.pptx",
    },
    { title: "Google", url: "https://www.google.com" },
  ],
  tasks: [
    { name: "Tarefa 1", subject: "MC322", dueDate: "2023-10-01" },
    { name: "Tarefa 2", subject: "MC322", dueDate: "2023-10-15" },
  ],
  notices: [
    {
      title: "Aviso Importante",
      message: "Não esqueçam da prova na próxima semana!",
      date: "2023-09-20",
    },
    {
      title: "Reunião Extraordinária",
      message: "Haverá uma reunião no dia 25/09 às 14h.",
      date: "2023-09-22",
    },
  ],
};

export default function MateriaPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const handleForumClick = () => {
    router.push(`/disciplinas/mc/${id}/forum`);
  };

  const handleAgendamentosClick = () => {
    router.push(`/disciplinas/mc/${id}/agendamentos`);
  };

  const handleTarefasClick = () => {
    router.push(`/disciplinas/mc/${id}/tarefas`);
  };

  return (
    <main className="text-black bg-white min-h-screen flex items-center justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-2/3 h-screen">
        <h2 className="mt-6 text-5xl font-bold text-black">{subject.name}</h2>
        <p className="mt-2 text-lg">Código: {subject.code}</p>
        <p className="text-lg">Créditos: {subject.credits}</p>
        <p className="mb-2 text-lg">Pré-requisitos: {subject.prerequisites}</p>

        <div className="mb-8">
          <p>
            <strong>Turma:</strong> {classroom.class}
          </p>
          <p>
            <strong>Professor:</strong> {classroom.teacher}
          </p>
          {/* <p>
            <strong>Área:</strong> {subject.area}
          </p> */}
        </div>

        <h3 className="text-2xl font-semibold mb-6">Avisos</h3>
        <ul className="space-y-6">
          {classroom.notices.map((notice, index) => {
            return (
              <li
                key={index}
                className="flex items-center bg-slate-200 p-4 rounded-lg mr-20"
              >
                <span key={index} className="material-icons text-sky-700">
                  assignment
                </span>
                <div className="flex flex-col pl-4">
                  <p className="text-black text-xl self-start">
                    {notice.message}
                  </p>
                  <p className="text-sm text-slate-500">
                    Publicado em {notice.date}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-1/3 h-screen flex flex-col items-center bg-slate-100 p-4 rounded-lg">
        <div className="w-full flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold mt-6">Recursos</h3>
          <Button onClick={handleForumClick} label="Fórum" />
          <Button onClick={handleAgendamentosClick} label="Agendamentos" />
          <Button onClick={handleTarefasClick} label="Tarefas" />
        </div>
        <div className="w-full mt-12 flex flex-col space-y-6">
          <h3 className="text-2xl font-semibold">Materiais</h3>
          <ul className="flex flex-col space-y-4">
            {classroom.materials.map((material, index) => (
              <li key={index} className="flex items-center">
                <span className="material-icons text-sky-700">description</span>
                <Link
                  href={material.url}
                  className="w-full ml-2 px-5 py-3 text-black bg-slate-200 cursor-pointer rounded-lg hover:bg-slate-300"
                >
                  {material.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
