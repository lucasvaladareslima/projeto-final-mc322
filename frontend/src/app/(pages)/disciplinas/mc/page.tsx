import React from 'react';
import SubjectTable from '@/components/SubjectTable'; // Componente de tabela
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Subject } from '@/types/index';

// Dados das disciplinas
const computerScienceSubjects: Subject[] = [
  { code: 'MC102', name: 'Algoritmos e Programação de Computadores I', credits: 4, prerequisites: '-', area: 'Teoria da Computação' },
  { code: 'MC202', name: 'Estruturas de Dados', credits: 4, prerequisites: 'MC102', area: 'Teoria da Computação' },
  { code: 'MC302', name: 'Programação Orientada a Objetos', credits: 4, prerequisites: 'MC202', area: 'Engenharia de Software' },
  { code: 'MC358', name: 'Fundamentos Matemáticos da Computação', credits: 4, prerequisites: 'MA211, MC102', area: 'Teoria da Computação' },
  { code: 'MO401', name: 'Introdução à Análise de Algoritmos', credits: 4, prerequisites: 'MC202, MC358', area: 'Teoria da Computação' },
  { code: 'MC458', name: 'Projeto e Análise de Algoritmos I', credits: 4, prerequisites: 'MO401', area: 'Teoria da Computação' },
  { code: 'MC886', name: 'Aprendizado de Máquina', credits: 4, prerequisites: 'MC358, ME310', area: 'Machine Learning' },
  { code: 'MC920', name: 'Introdução ao Processamento de Imagem Digital', credits: 4, prerequisites: 'MC202, MA311', area: 'Processamento de Sinais' },
];

export default function ComputacaoPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 sm:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-sky-700">Matérias do Instituto de Computação</h1>
          <p className="text-lg text-sky-600">Departamento MC/MO</p>
        </header>
        <SubjectTable subjects={computerScienceSubjects} />
      </div>
      <Footer />
    </>
  );
}
