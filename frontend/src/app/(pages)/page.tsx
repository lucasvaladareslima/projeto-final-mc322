import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubjectCard from '@/components/SubjectCard';
import Link from 'next/link';
import Image from 'next/image'; // Importando o componente de Imagem otimizado

// Dados das matérias - Em um projeto real, isso viria de uma API ou CMS
const materias = [
  { icon: 'calculate', title: 'Cálculo I', description: 'Fundamentos de limites, derivadas e integrais.' },
  { icon: 'code', title: 'Algoritmos e Estruturas de Dados I', description: 'Introdução à lógica de programação e estruturas de dados básicas.' },
  { icon: 'memory', title: 'Arquitetura de Computadores', description: 'Estudo da organização e funcionamento interno dos computadores.' },
];

export default function HomePage() {
  return (
    <>

      <main className="flex-grow">
        {/* Seção Hero */}
        <section className="hero-gradient py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold text-sky-800 mb-6 drop-shadow-lg">Sua Plataforma de Estudos Unificada</h2>
            <p className="text-xl text-sky-700 mb-10 max-w-3xl mx-auto">
              Acesse materiais, organize seus estudos e conecte-se com professores e colegas. Tudo em um só lugar.
            </p>
            <a className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-xl transition-transform duration-300 transform hover:scale-105 inline-flex items-center" href="#materias">
              <span className="material-icons mr-2">explore</span>
              Explorar Matérias
            </a>
          </div>
        </section>

        {/* Seção de Matérias */}
        <section className="py-16 bg-sky-50" id="materias">
          <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold text-sky-700 mb-12 text-center">Matérias Disponíveis</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Usando o map para renderizar os cards dinamicamente */}
              {materias.map((materia) => (
                <SubjectCard
                  key={materia.title} // Chave única para o React
                  icon={materia.icon}
                  title={materia.title}
                  description={materia.description}
                />
              ))}
          </div>
            <section className="w-full bg-sky-000 py-6 mt-12">
  <div className="container mx-auto flex justify-center">

                    <Link href="/disciplinas" className="bg-sky-200 text-sky-700 font-semibold py-3 px-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 flex items-center">
                        Ver todas as matérias
                         <span className="material-icons ml-2">arrow_forward</span>
                    </Link>
    
                </div>
            </section>
          </div>
        </section>

        {/* Adicionei as outras seções aqui para simplificar, mas elas também poderiam ser componentes! */}

      </main>
    </>
  );
}