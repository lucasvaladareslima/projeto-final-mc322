"use client"; // Necessário para usar hooks como o useRouter

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ProfessorClass } from '@/types';

interface ProfessorClassesTableProps {
  classes: ProfessorClass[];
}

const ProfessorClassesTable: React.FC<ProfessorClassesTableProps> = ({ classes }) => {
  const router = useRouter();

  // Função para navegar ao clicar na linha
  const handleRowClick = (classId: string) => {
    router.push(`/professor/turmas/${classId}`);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-sky-800 uppercase tracking-wider">Nome da Disciplina</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-sky-800 uppercase tracking-wider">Código</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-sky-800 uppercase tracking-wider">Turma</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map((cls) => (
              <tr 
                key={cls.id} 
                className="hover:bg-sky-50 transition-colors duration-150 cursor-pointer"
                onClick={() => handleRowClick(cls.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* O link principal fica no nome da disciplina para acessibilidade e SEO */}
                  <Link href={`/professor/turmas/${cls.id}`} className="text-md font-bold text-sky-700 hover:underline">
                    {cls.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{cls.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{cls.classId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorClassesTable;