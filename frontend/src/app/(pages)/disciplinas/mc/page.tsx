import React from "react";
import SubjectTable from "@/components/SubjectTable";
import type { Subject } from "@/types";
import { apiUrl } from "@/constants";

async function getMcSubjects(): Promise<Subject[]> {
  try {
    const url = `${apiUrl}/ensino/disciplina/`;
    const response = await fetch(url, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Erro na resposta da API: ${response.status} - ${text}`);
      throw new Error("Falha ao buscar as disciplinas de Computação");
    }

    // Aqui: tente ler o texto e logar antes do JSON.parse para debug
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(
        "Erro ao fazer parse do JSON:",
        e,
        "Resposta recebida:",
        text
      );
      return [];
    }
  } catch (error) {
    console.error("Erro na busca de disciplinas:", error);
    return [];
  }
}

// 3. A PÁGINA SE TORNA UM COMPONENTE ASSÍNCRONO
export default async function ComputacaoPage() {
  // 4. CHAMAMOS A FUNÇÃO E ESPERAMOS OS DADOS VINDOS DO BACKEND
  const subjects = await getMcSubjects();

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-sky-700">
          Matérias do Instituto de Computação
        </h1>
        <p className="text-lg text-sky-600">Departamento MC/MO</p>
      </header>

      {/* 5. PASSAMOS OS DADOS FILTRADOS DA API PARA O NOSSO COMPONENTE DE TABELA */}
      {subjects.length > 0 ? (
        <SubjectTable subjects={subjects} />
      ) : (
        <p className="text-center text-gray-500 py-8">
          Nenhuma disciplina de Computação encontrada ou a API está
          indisponível.
        </p>
      )}
    </div>
  );
}
