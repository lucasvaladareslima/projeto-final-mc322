import React from 'react';

interface DisciplineButtonProps {
  icon: string;       // O nome do Material Icon (ex: 'computer')
  label: string;      // O texto do botão (ex: 'MC/MO (Computação)')
}

const DisciplineButton: React.FC<DisciplineButtonProps> = ({ icon, label }) => {
  return (
    <button className="flex items-center gap-2 px-4 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 transition w-full">
        <span className="material-icons text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
    </button>

  );
};

export default DisciplineButton;