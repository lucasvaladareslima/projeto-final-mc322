"use client";

import React, { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiUrl } from '@/constants';
// Supondo que você tenha esses tipos definidos em /types
import type { User, Subject as Disciplina, PeriodoLetivo } from '@/types';

// Função auxiliar para pegar o cookie CSRF
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function CriarTurmaPage() {
  const router = useRouter();
  const { user: professor } = useAuth();

  // --- Estados do Formulário ---
  const [nome, setNome] = useState('');
  const [disciplinaId, setDisciplinaId] = useState<string>('');
  const [periodoLetivoId, setPeriodoLetivoId] = useState<string>('');
  
  // --- Estados para Gerenciamento de Listas ---
  const [allDisciplinas, setAllDisciplinas] = useState<Disciplina[]>([]);
  const [allPeriodos, setAllPeriodos] = useState<PeriodoLetivo[]>([]);
  const [allAvailableUsers, setAllAvailableUsers] = useState<User[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedMonitorId, setSelectedMonitorId] = useState<string>('');
  const [addedStudents, setAddedStudents] = useState<User[]>([]);
  const [addedMonitors, setAddedMonitors] = useState<User[]>([]);

  // --- Estados de Feedback de UI ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [listLoading, setListLoading] = useState(true);

  // --- Efeito para buscar todos os dados necessários ao carregar a página ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, disciplinasRes, periodosRes] = await Promise.all([
          fetch(`${apiUrl}/alunos/`, { credentials: 'include' }),
          fetch(`${apiUrl}/ensino/disciplina/`, { credentials: 'include' }),
          fetch(`${apiUrl}/ensino/periodo-letivo/`, { credentials: 'include' }),
        ]);

        if (!usersRes.ok || !disciplinasRes.ok || !periodosRes.ok) {
          throw new Error('Não foi possível carregar os dados necessários para o formulário.');
        }

        const users = await usersRes.json();
        const disciplinas = await disciplinasRes.json();
        const periodos = await periodosRes.json();

        setAllAvailableUsers(users);
        setAllDisciplinas(disciplinas);
        setAllPeriodos(periodos);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setListLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Funções para Adicionar/Remover Alunos e Monitores por ID ---
  const handleAddStudent = () => {
    if (!selectedStudentId) return;
    const studentToAdd = allAvailableUsers.find(u => u.public_id === selectedStudentId);
    if (studentToAdd && !addedStudents.some(s => s.public_id === studentToAdd.public_id)) {
      setAddedStudents([...addedStudents, studentToAdd]);
    }
  };
  const handleRemoveStudent = (studentId: string) => setAddedStudents(addedStudents.filter(s => s.public_id !== studentId));

  const handleAddMonitor = () => {
    if (!selectedMonitorId) return;
    const monitorToAdd = allAvailableUsers.find(u => u.public_id === selectedMonitorId);
    if (monitorToAdd && !addedMonitors.some(m => m.public_id === monitorToAdd.public_id)) {
      setAddedMonitors([...addedMonitors, monitorToAdd]);
    }
  };
  const handleRemoveMonitor = (monitorId: string) => setAddedMonitors(addedMonitors.filter(m => m.public_id !== monitorId));


  // --- Lógica de Submissão Final ---
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!professor || professor.type !== 'PROFESSOR') {
      setError("Ação não permitida.");
      setIsSubmitting(false);
      return;
    }

    try {
       const newClassData = {
  nome,
  disciplina:     parseInt(disciplinaId, 10),       // int mesmo
  periodo_letivo: parseInt(periodoLetivoId, 10),    // int mesmo
  professor:      professor.public_id,               // string UUID
  alunos:         addedStudents.map(s => s.public_id),   // [‘uuid1’, ‘uuid2’, …]
  monitores:      addedMonitors.map(m => m.public_id),   // [‘uuid3’, …]
};

      const csrftoken = getCookie('csrftoken');
      if (!csrftoken) throw new Error("Token CSRF não encontrado.");

      const response = await fetch(`${apiUrl}/ensino/turma/cadastrar/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
        credentials: 'include',
        body: JSON.stringify(newClassData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).flat().join(' ') || 'Falha ao criar a turma.';
        throw new Error(errorMessage);
      }

      alert("Turma criada com sucesso!");
      router.push('/conta/professor/minhas-turmas');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-sky-800">Criar Nova Turma</h1>
        <p className="text-lg text-gray-600 mt-1">Preencha os detalhes da turma e adicione os participantes.</p>
      </header>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seção de Detalhes da Turma com Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome da Turma (Ex: Turma A)</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required disabled={isSubmitting} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3 bg-gray-50"/>
            </div>
            <div>
              <label htmlFor="disciplinaId" className="block text-sm font-medium text-gray-700">Disciplina</label>
              <select id="disciplinaId" value={disciplinaId} onChange={(e) => setDisciplinaId(e.target.value)} required disabled={isSubmitting || listLoading} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3 bg-gray-50">
                <option value="">Selecione a Disciplina</option>
                {allDisciplinas.map(d => <option key={d.id} value={d.id}>{d.codigo} - {d.nome}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="periodoLetivoId" className="block text-sm font-medium text-gray-700">Período Letivo</label>
              <select id="periodoLetivoId" value={periodoLetivoId} onChange={(e) => setPeriodoLetivoId(e.target.value)} required disabled={isSubmitting || listLoading} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3 bg-gray-50">
                <option value="">Selecione o Período</option>
                {allPeriodos.map(p => <option key={p.id} value={p.id}>{p.ano}/{p.semestre}</option>)}
              </select>
            </div>
          </div>
          
          {/* Seções de Alunos e Monitores com Select */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-800">Adicionar Alunos</h3>
            {listLoading ? <p className="text-sm text-gray-500">Carregando listas...</p> : (
              <div className="flex items-center gap-4 mt-4">
                <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} className="flex-grow rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3 bg-gray-50">
                  <option value="">Selecione um aluno</option>
                  {allAvailableUsers.map(u =>
                    <option key={u.public_id} value={u.public_id}>
                      {u.name} ({u.email})
                    </option>
                  )}
                </select>
                <button type="button" onClick={handleAddStudent} disabled={isSubmitting || !selectedStudentId} className="bg-sky-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-gray-400">Adicionar</button>
              </div>
            )}
            <div className="mt-4 space-y-2">
              {addedStudents.map((student) => (
                <div key={student.public_id} className="flex items-center justify-between bg-sky-50 p-3 rounded-lg"><span className="text-gray-700">{student.name}</span><button type="button" onClick={() => handleRemoveStudent(student.public_id)} disabled={isSubmitting} className="text-red-500 hover:text-red-700 disabled:text-gray-400"><span className="material-icons text-xl">delete</span></button></div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-800">Adicionar Monitores</h3>
             {listLoading ? <p className="text-sm text-gray-500">Carregando listas...</p> : (
              <div className="flex items-center gap-4 mt-4">
                <select value={selectedMonitorId} onChange={(e) => setSelectedMonitorId(e.target.value)} className="flex-grow rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3 bg-gray-50">
                   <option value="">Selecione um monitor</option>
                  {allAvailableUsers.map(u => <option key={u.public_id} value={u.public_id}>{u.name} ({u.email})</option>)}
                </select>
                <button type="button" onClick={handleAddMonitor} disabled={isSubmitting || !selectedMonitorId} className="bg-sky-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-gray-400">Adicionar</button>
              </div>
            )}
            <div className="mt-4 space-y-2">
                {addedMonitors.map((monitor) => (
                    <div key={monitor.public_id} className="flex items-center justify-between bg-sky-50 p-3 rounded-lg"><span className="text-gray-700">{monitor.name}</span><button type="button" onClick={() => handleRemoveMonitor(monitor.public_id)} disabled={isSubmitting} className="text-red-500 hover:text-red-700 disabled:text-gray-400"><span className="material-icons text-xl">delete</span></button></div>
                ))}
            </div>
          </div>

          {error && <div className="text-sm text-center text-red-700 bg-red-100 p-3 rounded-lg border border-red-200">{error}</div>}
          <div className="flex justify-end pt-8 border-t border-gray-200">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary-dark flex items-center gap-2 p-4 rounded-full disabled:bg-gray-400">
              <span className="material-icons">save</span>
              {isSubmitting ? 'Criando Turma...' : 'Criar Turma'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}