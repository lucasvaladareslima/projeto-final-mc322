import React from 'react';
import Link from 'next/link';

interface DashboardActionCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

const DashboardActionCard: React.FC<DashboardActionCardProps> = ({ href, icon, title, description }) => {
  return (
    <Link 
      href={href}
      className="block text-center bg-white p-8 rounded-2xl shadow-lg border border-transparent hover:border-sky-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="flex justify-center items-center mx-auto bg-sky-100 rounded-full w-20 h-20">
        <span className="material-icons text-4xl text-sky-600 group-hover:text-sky-700 transition-colors">
          {icon}
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-bold text-sky-800">
        {title}
      </h3>
      <p className="mt-2 text-md text-gray-600">
        {description}
      </p>
    </Link>
  );
};

export default DashboardActionCard;