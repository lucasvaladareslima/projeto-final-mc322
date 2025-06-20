import React from 'react';
import type { Task } from '@/types';

interface PendingTasksCardProps {
  tasks: Task[];
}

const PendingTasksCard: React.FC<PendingTasksCardProps> = ({ tasks }) => {
  return (
    <div className="card w-full">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
        <span className="material-icons mr-2 align-middle">pending_actions</span>
        Tarefas Pendentes
      </h2>

      {/* AQUI ESTÁ A LÓGICA: Mostra a tabela se houver tarefas, ou uma mensagem se não houver. */}
      {tasks.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-blue-200">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="table-header">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome da Tarefa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Disciplina</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data de Entrega</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-200">
              {tasks.map((task) => (
                <tr key={task.name}>
                  <td className="table-cell">{task.name}</td>
                  <td className="table-cell">{task.subject}</td>
                  <td className="table-cell">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Nenhuma tarefa pendente no momento. Bom trabalho!
        </p>
      )}
    </div>
  );
};

export default PendingTasksCard;