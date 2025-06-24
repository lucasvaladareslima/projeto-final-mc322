"use client";

import CurrentSubjectCard from "@/components/CurrentSubjectCard";
import { apiUrl } from "@/constants";
import type { CurrentSubject, Subject } from "@/types";
import { useEffect, useState } from "react";

// const currentSubjects: CurrentSubject[] = [
//   { id: '1', name: 'Estruturas de Dados', code: 'MC202', class: 'A', credits: 4, professor: 'Prof. Guido' },
//   { id: '2', name: 'Cálculo II', code: 'MA211', class: 'B', credits: 6, professor: 'Profa. Lilian' },
//   { id: '3', name: 'Engenharia de Software', code: 'MC322', class: 'S', credits: 4, professor: 'Prof. Bira' },
//   { id: '4', name: 'Física Experimental I', code: 'F_129', class: 'D', credits: 2, professor: 'Prof. Pascoal' },
//   { id: '5', name: 'Sistemas de Informação', code: 'MC536', class: 'A', credits: 4, professor: 'Profa. Islene' },
// ];

export default function DisciplinasAtuaisPage() {
  const [currentSubjects, setCurrentSubjects] = useState<CurrentSubject[]>([]);

  useEffect(() => {
    async function fetchSubject() {
      try {
        const professor_id = 1;
        const resTurma = await fetch(
          `${apiUrl}/ensino/turma/professor/${professor_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        ); // Exemplo de endpoint
        if (!resTurma.ok) {
          console.error("Erro ao buscar disciplina");
          return;
        }
        const turmaData = await resTurma.json();

        setCurrentSubjects(turmaData || []);
      } catch (error) {
        console.error("Erro ao buscar disciplina:", error);
        return;
      }
    }
    fetchSubject();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-sky-800">Disciplinas Atuais</h1>
        <p className="text-lg text-gray-600 mt-1">Semestre 2025/1º</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentSubjects.map((subject) => (
          // O nome do componente em uso também foi atualizado
          <CurrentSubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
