import React from 'react';
import Link from 'next/link';
import type { CurrentSubject } from '@/types';

// A interface também pode ser renomeada para maior clareza
interface CurrentSubjectCardProps {
  subject: CurrentSubject;
}

// O nome do componente foi alterado aqui
const CurrentSubjectCard: React.FC<CurrentSubjectCardProps> = ({ subject }) => {
  const subjectHref = `/disciplinas/${subject.id}`;

  return (
    <Link 
      href={subjectHref}
      className="block bg-white p-6 rounded-xl shadow-md border border-transparent hover:border-sky-500 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-sky-700 group-hover:text-sky-600 transition-colors">
            {subject.name}
          </h3>
          <p className="text-sm font-mono bg-sky-100 text-sky-800 inline-block px-2 py-1 rounded-md mt-2">
            {subject.code} - Turma {subject.class}
          </p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="text-lg font-semibold text-gray-800">{subject.credits}</p>
          <p className="text-xs text-gray-500">créditos</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Professor(a):</span> {subject.professor}
        </p>
      </div>
    </Link>
  );
};

// A exportação default também foi atualizada
export default CurrentSubjectCard;