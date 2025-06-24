import React from "react";
import PastSubjectsTable from "@/components/PastSubjectTable";
import type { PastSubject } from "@/types";
import { apiUrl } from "@/constants";

// 1. CRIAMOS A FUNÇÃO PARA BUSCAR OS DADOS DA API
async function getPastSubjects(): Promise<PastSubject[]> {
  try {
    // 2. FAZEMOS A CHAMADA PARA O ENDPOINT ESPECÍFICO DE DISCIPLINAS PASSADAS
    // Lembre-se de verificar se a rota é '/subjects/past' ou outra no seu backend!
    const response = await fetch(`${apiUrl}/subjects/past`, {
      cache: "no-store", // Garante que os dados sejam sempre os mais recentes
    });

    if (!response.ok) {
      throw new Error("Falha ao buscar o histórico de disciplinas");
    }

    return response.json();
  } catch (error) {
    console.error("Erro na busca de dados:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// 3. A PÁGINA SE TORNA UM COMPONENTE ASSÍNCRONO
export default async function DisciplinasPassadasPage() {
  // 4. CHAMAMOS A FUNÇÃO E ESPERAMOS OS DADOS VINDOS DO BACKEND
  const subjects = await getPastSubjects();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-sky-800">
          Histórico de Disciplinas
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          Todas as disciplinas cursadas e suas notas finais.
        </p>
      </header>

      {/* 5. PASSAMOS OS DADOS DA API PARA O COMPONENTE DE TABELA */}
      {subjects.length > 0 ? (
        <PastSubjectsTable subjects={subjects} />
      ) : (
        <p className="text-center text-gray-500 py-8">
          Ainda não há disciplinas no seu histórico.
        </p>
      )}
    </div>
  );
}
