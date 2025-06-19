import DisciplineButton from "@/components/DisciplineButton";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const disciplines = [
  { icon: 'computer', label: 'MC/MO (Computação)' },
  { icon: 'calculate', label: 'MA (Matemática)' },
  { icon: 'science', label: 'F (Física)' },
  { icon: 'functions', label: 'MS (Matemática Aplicada)' },
  { icon: 'assessment', label: 'ME (Estatística)' },
  { icon: 'groups', label: 'CE (Humanas)' },
];

export default function DisciplinasPage() {
  return (
    <>
      <Header />
      
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        <h2 className="text-3xl font-semibold text-gray-700 mb-12 text-center">
          Selecione a Área da Disciplina
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {disciplines.map((discipline) => (
            <DisciplineButton
              key={discipline.label}
              icon={discipline.icon}
              label={discipline.label}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
