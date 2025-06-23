import React from 'react';
import type { Subject } from '@/types/index'; // Importando nosso tipo

// O componente da tabela recebe a lista de matérias como uma prop
const SubjectTable: React.FC<{ subjects: Subject[] }> = ({ subjects }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 bg-sky-600 text-white">
        <h2 className="text-2xl font-semibold">Grade Curricular - MC/MO</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-sky-100 border-b border-sky-200">
            <tr>
              <th className="text-left py-4 px-6 text-sky-800 font-semibold uppercase tracking-wider">Nome da Matéria</th>
              <th className="text-left py-4 px-6 text-sky-800 font-semibold uppercase tracking-wider">Créditos</th>
              <th className="text-left py-4 px-6 text-sky-800 font-semibold uppercase tracking-wider">Pré-Requisitos</th>
              <th className="text-left py-4 px-6 text-sky-800 font-semibold uppercase tracking-wider">Área</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {/* AQUI ESTÁ A MÁGICA: Usamos .map() para criar uma linha para cada matéria */}
            {subjects.map((subject) => (
              <tr key={subject.code} className="border-b border-sky-100 hover:bg-sky-50 transition-colors duration-150">
                <td className="py-4 px-6">{subject.code} - {subject.name}</td>
                <td className="py-4 px-6">{subject.credits}</td>
                <td className="py-4 px-6">{subject.prerequisites}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectTable;