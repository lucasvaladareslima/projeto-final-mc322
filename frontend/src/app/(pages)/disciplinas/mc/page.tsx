import React from 'react';
import SubjectTable from '@/components/SubjectTable';
import type { Subject } from '@/types';

// 1. CRIAMOS A FUNÇÃO DE BUSCA ESPECÍFICA PARA AS DISCIPLINAS DE MC
async function getMcSubjects(): Promise<Subject[]> {
  try {
    // 2. FAZEMOS A CHAMADA PARA O ENDPOINT COM O FILTRO
    // Note o '?department=MC' no final da URL para filtrar os resultados
    const response = await fetch(`${process.env.API_BASE_URL}/subjects?department=MC`, {
      next: {
        revalidate: 3600, // Otimização: guarda o resultado em cache por 1 hora
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar as disciplinas de Computação');
    }

    return response.json();

  } catch (error) {
    console.error("Erro na busca de dados:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// 3. A PÁGINA SE TORNA UM COMPONENTE ASSÍNCRONO
export default async function ComputacaoPage() {
  
  // 4. CHAMAMOS A FUNÇÃO E ESPERAMOS OS DADOS VINDOS DO BACKEND
  const subjects = await getMcSubjects();

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-sky-700">Matérias do Instituto de Computação</h1>
        <p className="text-lg text-sky-600">Departamento MC/MO</p>
      </header>
      
      {/* 5. PASSAMOS OS DADOS FILTRADOS DA API PARA O NOSSO COMPONENTE DE TABELA */}
      {subjects.length > 0 ? (
        <SubjectTable subjects={subjects} />
      ) : (
        <p className="text-center text-gray-500 py-8">
          Nenhuma disciplina de Computação encontrada ou a API está indisponível.
        </p>
      )}
    </div>
  );
}