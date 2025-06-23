import React from 'react';
import ProfessorClassesTable from '@/components/ProfessorClassesTable';
import type { ProfessorClass } from '@/types';

// Função para simular a busca de dados de uma API
async function getProfessorClasses(): Promise<ProfessorClass[]> {
  try {
    // AQUI ESTÁ A MUDANÇA!
    // Substitua 'ID_DO_PROFESSOR_LOGADO' pelo ID do professor.
    // Em um app real, esse ID viria da sessão do usuário após o login.
    const professorId = 'ID_DO_PROFESSOR_LOGADO'; // <<<--- POR ENQUANTO, USE UM ID FIXO PARA TESTAR

    const response = await fetch(`${process.env.API_BASE_URL}/api/professors/${professorId}/classes`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar as turmas do professor');
    }

    return response.json();

  } catch (error) {
    console.error("Erro na busca de dados:", error);
    return [];
  }
}

export default async function MinhasTurmasPage() {
  const classes = await getProfessorClasses();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-sky-800">Minhas Turmas Atuais</h1>
        <p className="text-lg text-gray-600 mt-1">Gerencie suas turmas ativas do semestre.</p>
      </header>
      
      {classes.length > 0 ? (
        <ProfessorClassesTable classes={classes} />
      ) : (
        <p className="text-center text-gray-500 py-8 bg-white rounded-lg shadow-md">
          Você não possui turmas ativas no momento.
        </p>
      )}
    </div>
  );
}