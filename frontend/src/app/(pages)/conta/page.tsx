import React from 'react';
import Link from 'next/link';
import PendingTasksCard from '@/components/PendingTasksCard';
import type { Task } from '@/types';

// 1. CRIAMOS A FUNÇÃO PARA BUSCAR AS TAREFAS PENDENTES
async function getPendingTasks(): Promise<Task[]> {
  try {
    // 2. FAZEMOS A CHAMADA PARA O ENDPOINT DA API DE TAREFAS
    // Verifique o endpoint correto no seu backend!
    const response = await fetch(`${process.env.API_BASE_URL}/tasks/pending`, {
      cache: 'no-store', // Garante que os dados de tarefas sejam sempre os mais recentes
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar as tarefas pendentes');
    }

    return response.json();

  } catch (error) {
    console.error("Erro na busca de dados das tarefas:", error);
    return []; // Retorna um array vazio em caso de erro para não quebrar a página
  }
}

// 3. A PÁGINA SE TORNA UM COMPONENTE ASSÍNCRONO
export default async function AccountPage() {
  
  // 4. CHAMAMOS A FUNÇÃO E ESPERAMOS OS DADOS VINDOS DO BACKEND
  const tasks = await getPendingTasks();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700">Minhas Disciplinas</h1>
      </header>
      
      <div className="flex flex-row justify-center items-center mb-10 gap-6">
        <Link href="/conta/disciplinas-atuais" className="btn btn-primary-dark text-center rounded-full py-5 px-12 text-2xl">
            <span className="material-icons mr-2 align-middle">school</span>
            Disciplinas Atuais
        </Link>
        <Link href="/conta/disciplinas-passadas" className="btn btn-primary-dark text-center rounded-full py-5 px-12 text-2xl">
            <span className="material-icons mr-2 align-middle">history</span>
            Disciplinas Passadas
        </Link>
      </div>

      <div className="grid grid-cols-1">
        {/* 5. PASSAMOS OS DADOS DA API PARA O NOSSO COMPONENTE DE CARD */}
        <PendingTasksCard tasks={tasks} />
      </div>
    </div>
  );
}