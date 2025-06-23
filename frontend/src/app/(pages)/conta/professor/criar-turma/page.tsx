"use client"; // Obrigatório para interatividade e uso de hooks como useState

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CriarTurmaPage() {
  const router = useRouter();

  // Estados para os campos do formulário
  const [courseCode, setCourseCode] = useState('');
  const [classId, setClassId] = useState('');
  
  // Estado para a lista de alunos (vamos usar o e-mail como identificador)
  const [students, setStudents] = useState<string[]>([]);
  const [currentStudentEmail, setCurrentStudentEmail] = useState('');

  const [monitors, setMonitors] = useState<string[]>([]);
  const [currentMonitorEmail, setCurrentMonitorEmail] = useState('');

  const handleAddMonitor = () => {
    if (currentMonitorEmail && !monitors.includes(currentMonitorEmail)) {
      setMonitors([...monitors, currentMonitorEmail]);
      setCurrentMonitorEmail(''); // Limpa o campo de input
    }
  };

  const handleRemoveMonitor = (emailToRemove: string) => {
    setMonitors(monitors.filter(email => email !== emailToRemove));
  };

  // Função para adicionar um aluno à lista
  const handleAddStudent = () => {
    // Verifica se o input não está vazio e se o e-mail já não foi adicionado
    if (currentStudentEmail && !students.includes(currentStudentEmail)) {
      setStudents([...students, currentStudentEmail]);
      setCurrentStudentEmail(''); // Limpa o campo de input
    }
  };

  // Função para remover um aluno da lista
  const handleRemoveStudent = (emailToRemove: string) => {
    setStudents(students.filter(email => email !== emailToRemove));
  };

  // Função para lidar com o envio do formulário principal
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newClassData = {
      courseCode,
      classId,
      students,
      monitors,
    };
    console.log("Enviando para a API:", newClassData);
    alert("Turma criada com sucesso! (Simulação)");
    router.push('/conta/professor/minhas-turmas'); // Redireciona para a página de turmas após criar
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-sky-800">Criar Nova Turma</h1>
        <p className="text-lg text-gray-600 mt-1">Preencha os detalhes da turma e adicione os alunos.</p>
      </header>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seção de Detalhes da Turma */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Código</label>
              <input type="text" id="courseCode" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-black p-3 bg-gray-50"/>
            </div>
            <div>
              <label htmlFor="classId" className="block text-sm font-medium text-gray-700">Turma</label>
              <input type="text" id="classId" value={classId} onChange={(e) => setClassId(e.target.value)} required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-black p-3 bg-gray-50"/>
            </div>
          </div>
          
          {/* Seção de Adicionar Alunos */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-800">Lista de Alunos</h3>
            <div className="flex items-center gap-4 mt-4">
              <input 
                type="email" 
                value={currentStudentEmail}
                onChange={(e) => setCurrentStudentEmail(e.target.value)}
                className="flex-grow rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-black p-3 bg-gray-50"
                placeholder="E-mail do aluno"
              />
              <button 
                type="button" 
                onClick={handleAddStudent}
                className="bg-sky-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Adicionar
              </button>
            </div>

            {/* Lista de Alunos Adicionados */}
            <div className="mt-4 space-y-2">
              {students.length > 0 ? (
                students.map((email) => (
                  <div key={email} className="flex items-center justify-between bg-sky-50 p-3 rounded-lg">
                    <span className="text-gray-700">{email}</span>
                    <button type="button" onClick={() => handleRemoveStudent(email)} className="text-red-500 hover:text-red-700">
                      <span className="material-icons text-xl">delete</span>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Nenhum aluno adicionado ainda.</p>
              )}
            </div>
          </div>

           {/* ====> SEÇÃO DE ADICIONAR MONITORES (NOVA) <==== */}
  <div className="border-t border-gray-200 pt-8">
    <h3 className="text-lg font-semibold text-gray-800">Lista de Monitores</h3>
    <div className="flex items-center gap-4 mt-4">
      <input 
        type="email" 
        value={currentMonitorEmail}
        onChange={(e) => setCurrentMonitorEmail(e.target.value)}
        className="flex-grow rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-black p-3 bg-gray-50"
        placeholder="E-mail do monitor"
      />
      <button 
        type="button" 
        onClick={handleAddMonitor}
        className="bg-sky-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-sky-700 transition-colors"
      >
        Adicionar
      </button>
    </div>

    {/* Lista de Monitores Adicionados */}
    <div className="mt-4 space-y-2">
      {monitors.length > 0 ? (
        monitors.map((email) => (
          <div key={email} className="flex items-center justify-between bg-sky-50 p-3 rounded-lg">
            <span className="text-gray-700">{email}</span>
            <button type="button" onClick={() => handleRemoveMonitor(email)} className="text-red-500 hover:text-red-700">
              <span className="material-icons text-xl">delete</span>
            </button>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">Nenhum monitor adicionado ainda.</p>
      )}
    </div>
  </div>

          {/* Botão de Submissão Final */}
          <div className="flex justify-end pt-8 border-t border-gray-200">
            <button type="submit" className="btn btn-primary-dark flex items-center gap-2 p-4 rounded-full">
              <span className="material-icons">save</span>
              Criar Turma
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}