import React from 'react';
import type { ProfessorPastClass } from '@/types';

interface ProfessorPastClassesTableProps {
  classes: ProfessorPastClass[];
}

const ProfessorPastClassesTable: React.FC<ProfessorPastClassesTableProps> = ({ classes }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-sky-800 uppercase tracking-wider">Nome da Disciplina</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-sky-800 uppercase tracking-wider">Código</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-sky-800 uppercase tracking-wider">Turma</th>
              {/* Nova coluna para o semestre */}
              <th className="px-6 py-4 text-center text-sm font-bold text-sky-800 uppercase tracking-wider">Semestre</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-md font-medium text-gray-900">{cls.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{cls.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{cls.classId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{cls.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorPastClassesTable;