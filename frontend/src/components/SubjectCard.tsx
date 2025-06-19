import React from 'react';

// Definindo a "forma" dos dados que o nosso card vai receber com TypeScript
interface SubjectCardProps {
  icon: string;
  title: string;
  description: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="material-icons text-sky-600 text-3xl mr-3">{icon}</span>
          <h4 className="text-xl font-semibold text-sky-700">{title}</h4>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a className="inline-block bg-sky-100 text-sky-700 hover:bg-sky-200 font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-300" href="#">
          Acessar Material
        </a>
      </div>
    </div>
  );
};

export default SubjectCard;