import React from "react";
import Link from "next/link";
import PendingTasksCard from "@/components/PendingTasksCard";
import type { Task } from "@/types";

// Dados de exemplo
const pendingTasksData: Task[] = [
  {
    name: "Trabalho de Cálculo Vetorial",
    subject: "Cálculo II",
    dueDate: "2025-07-15",
  },
  {
    name: "Prova de Algoritmos",
    subject: "Estrutura de Dados",
    dueDate: "2025-07-22",
  },
  {
    name: "Apresentação de Projeto",
    subject: "Engenharia de Software",
    dueDate: "2025-08-01",
  },
  {
    name: "Lista de Exercícios",
    subject: "Física Experimental",
    dueDate: "2025-07-29",
  },
  {
    name: "Seminário de IA",
    subject: "Inteligência Artificial",
    dueDate: "2025-08-10",
  },
];

export default function AccountPage() {
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        {/* Header específico da página */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">
            Minhas Disciplinas
          </h1>
        </header>

        {/* Links para outras seções */}
        {/* O container agora alinha em linha e centraliza o grupo de botões */}
        <div className="flex flex-row justify-center items-center mb-10 gap-6">
          {/* O botão/link não tem mais w-full, então seu tamanho é natural */}
          <Link
            href="/conta/disciplinas-atuais"
            className="btn btn-primary-dark text-center rounded-full py-5 px-12 text-2xl"
          >
            <span className="material-icons mr-2 align-middle">school</span>
            Disciplinas Atuais
          </Link>

          {/* O segundo botão/link segue o mesmo padrão */}
          <Link
            href="/conta/disciplinas-passadas"
            className="btn btn-primary-dark text-center rounded-full py-5 px-12 text-2xl"
          >
            <span className="material-icons mr-2 align-middle">history</span>
            Disciplinas Passadas
          </Link>
        </div>

        {/* Tarefas pendentes */}
        <div className="grid grid-cols-1">
          <PendingTasksCard tasks={pendingTasksData} />
        </div>
      </div>
    </>
  );
}
