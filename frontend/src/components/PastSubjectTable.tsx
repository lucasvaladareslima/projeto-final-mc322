import React from 'react';
import type { PastSubject } from '@/types'; // Importando nosso novo tipo

interface PastSubjectsTableProps {
  subjects: PastSubject[];
}

const PastSubjectsTable: React.FC<PastSubjectsTableProps> = ({ subjects }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-sky-800 uppercase tracking-wider">Disciplina</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-sky-800 uppercase tracking-wider">Semestre</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-sky-800 uppercase tracking-wider">Nota Final</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-sky-800 uppercase tracking-wider">Créditos</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects.map((subject) => (
              <tr key={subject.code} className="hover:bg-sky-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-md font-medium text-gray-900">{subject.name}</div>
                  <div className="text-sm text-gray-500 font-mono">{subject.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{subject.semester}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {/* Mudamos a cor da nota se for abaixo da média */}
                  <span className={`text-lg font-bold ${subject.grade >= 5.0 ? 'text-green-600' : 'text-red-600'}`}>
                    {subject.grade.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{subject.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastSubjectsTable;