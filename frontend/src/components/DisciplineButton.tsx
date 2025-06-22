import React from 'react';
import Link from 'next/link'; // 1. Importe o componente Link
import type { DisciplineButtonProps } from '@/types/index';

// 2. Adicione 'href' às props que o componente recebe
const DisciplineButton: React.FC<DisciplineButtonProps> = ({ icon, label, href }) => {
  return (
    // 3. Substitua <button> por <Link> e passe a prop 'href'
    <Link href={href} className="flex items-center gap-2 px-4 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 transition w-full">
        <span className="material-icons text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
    </Link>
  );
};

export default DisciplineButton; // Não se esqueça de exportar o componente