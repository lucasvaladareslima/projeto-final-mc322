import React from 'react';
import PastSubjectsTable from '@/components/PastSubjectTable';
import type { PastSubject } from '@/types';

// Nossos dados de exemplo
const pastSubjectsData: PastSubject[] = [
  { code: 'MC102', name: 'Algoritmos e Programação', semester: '2024/1', grade: 9.5, credits: 4 },
  { code: 'MA111', name: 'Cálculo I', semester: '2024/1', grade: 7.0, credits: 6 },
  { code: 'F_128', name: 'Física I', semester: '2024/1', grade: 8.0, credits: 4 },
  { code: 'MC202', name: 'Estruturas de Dados', semester: '2024/2', grade: 10.0, credits: 4 },
  { code: 'MA311', name: 'Cálculo III', semester: '2024/2', grade: 7.5, credits: 6 },
  { code: 'EA513', name: 'Circuitos Elétricos', semester: '2024/2', grade: 4.9, credits: 4 },
];

export default function DisciplinasPassadasPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-sky-800">Histórico de Disciplinas</h1>
        <p className="text-lg text-gray-600 mt-1">Todas as disciplinas cursadas e suas notas finais.</p>
      </header>

      {/* Usando nosso componente de tabela e passando os dados para ele */}
      <PastSubjectsTable subjects={pastSubjectsData} />
    </div>
  );
}