import React from 'react';
import ProfessorPastClassesTable from '@/components/ProfessorPastClassesTable';
import type { ProfessorPastClass } from '@/types';

// 1. CRIAMOS A FUNÇÃO DE BUSCA PARA AS TURMAS PASSADAS
async function getProfessorPastClasses(): Promise<ProfessorPastClass[]> {
  try {
    // Em uma aplicação real, o ID viria da sessão do usuário logado.
    // Para este exemplo, vamos usar um ID fixo.
    const professorId = 'ID_DO_PROFESSOR_LOGADO'; // <<<--- USE UM ID VÁLIDO DO SEU BANCO DE DADOS PARA TESTAR

    // 2. FAZEMOS A CHAMADA PARA O ENDPOINT ESPECÍFICO
    const response = await fetch(`${process.env.API_BASE_URL}/api/professors/${professorId}/classes/past`, {
      next: {
        revalidate: 86400, // O histórico não muda, então podemos guardar em cache por 1 dia (86400 segundos)
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar o histórico de turmas');
    }

    return response.json();

  } catch (error) {
    console.error("Erro na busca de dados:", error);
    return [];
  }
}

// 3. A PÁGINA CONTINUA SENDO UM COMPONENTE ASSÍNCRONO
export default async function TurmasPassadasPage() {
  
  // 4. BUSCAMOS OS DADOS AO CARREGAR A PÁGINA
  const classes = await getProfessorPastClasses();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-sky-800">Histórico de Turmas</h1>
        <p className="text-lg text-gray-600 mt-1">Consulte os detalhes de suas turmas já encerradas.</p>
      </header>
      
      {/* 5. PASSAMOS OS DADOS VINDOS DA API PARA O COMPONENTE DE TABELA */}
      {classes.length > 0 ? (
        <ProfessorPastClassesTable classes={classes} />
      ) : (
        <p className="text-center text-gray-500 py-8 bg-white rounded-lg shadow-md">
          Você ainda não possui um histórico de turmas.
        </p>
      )}
    </div>
  );
}