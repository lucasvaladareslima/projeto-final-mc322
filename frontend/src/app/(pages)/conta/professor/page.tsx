import React from 'react';
import DashboardActionCard from '@/components/DashboardActionCard';

// 1. Definimos os dados para cada um dos nossos botões de ação em um array
const professorActions = [
  {
    href: '/conta/professor/criar-turma',
    icon: 'add_circle_outline',
    title: 'Criar Turma',
    description: 'Inicie uma nova turma para o próximo semestre letivo.'
  },
  {
    href: '/conta/professor/minhas-turmas',
    icon: 'school',
    title: 'Minhas Turmas',
    description: 'Gerencie suas turmas ativas, adicione materiais e notas.'
  },
  {
    href: '/conta/professor/turmas-passadas',
    icon: 'history',
    title: 'Turmas Passadas',
    description: 'Consulte o histórico de suas turmas e alunos anteriores.'
  }
];

export default function ProfessorDashboardPage() {
  return (
    <div className="bg-sky-50 min-h-full"> {/* Garante o fundo azul claro */}
      <div className="container mx-auto p-4 md:p-8">
        
        {/* Cabeçalho específico da página */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-sky-800">Painel do Professor</h1>
          <p className="text-lg text-gray-600 mt-2">Bem-vindo(a)! Selecione uma das ações abaixo para começar.</p>
        </header>

        {/* 2. Usamos .map() para renderizar os cards dinamicamente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {professorActions.map((action) => (
            <DashboardActionCard
              key={action.title}
              href={action.href}
              icon={action.icon}
              title={action.title}
              description={action.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}