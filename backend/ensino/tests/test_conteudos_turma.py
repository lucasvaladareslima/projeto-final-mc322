from django.test import TestCase
from usuarios.models import Professor  # ou o nome correto da classe
from ensino.models.turma import Turma
from ensino.models.disciplina import Disciplina
from ensino.models.conteudo_turma import Material, Tarefa, Anuncio
from django.utils import timezone

class PostModelsTest(TestCase):
    def setUp(self):
        # Criar professor para associar à turma
        self.professor = Professor.objects.create_user(
            username='professor1',
            password='senha123',
            email='professor1@example.com',
        )

        # Criar disciplina para associar à turma
        self.disciplina = Disciplina.objects.create(
            nome='Matemática',
            codigo='MAT101',
            descricao='Disciplina de Matemática Básica'
        )

        # Criar a turma com o professor obrigatório
        self.turma = Turma.objects.create(
            nome='Turma Teste',
            disciplina=self.disciplina, 
            professor=self.professor,  
        )

        #Criar alguns posts de teste
        self.material = Material.objects.create(
            titulo='Material de Aula',
            conteudo='Conteúdo do material',
            autor=self.professor,
            turma=self.turma,
            arquivo='materiais/material_teste.pdf'
        )
        self.tarefa = Tarefa.objects.create(
            titulo='Tarefa de Casa',
            conteudo='Resolva os exercícios 1 a 5',
            autor=self.professor,
            turma=self.turma,
            data_entrega= timezone.now()
        )
        self.anuncio = Anuncio.objects.create(
            titulo='Prova marcada!',
            conteudo='A prova será na próxima terça-feira.',
            autor=self.professor,
            turma=self.turma
        )

    def test_criar_material(self):
        material = Material.objects.create(
            titulo='Material de Aula',
            conteudo='Conteúdo do material',
            autor=self.professor,
            turma=self.turma,
            arquivo='materiais/material_teste.pdf'
        )
        self.assertEqual(material.titulo, 'Material de Aula')
        self.assertEqual(material.turma, self.turma)
        self.assertTrue(material.pk)

    def test_criar_tarefa(self):
        tarefa = Tarefa.objects.create(
            titulo='Tarefa de Casa',
            conteudo='Resolva os exercícios 1 a 5',
            autor=self.professor,
            turma=self.turma,
            data_entrega= timezone.now()
        )
        self.assertIn('Tarefa', tarefa.__class__.__name__)
        self.assertEqual(tarefa.turma, self.turma)

    def test_criar_anuncio(self):
        anuncio = Anuncio.objects.create(
            titulo='Prova marcada!',
            conteudo='A prova será na próxima terça-feira.',
            autor=self.professor,
            turma=self.turma
        )
        self.assertTrue(anuncio.pk)
        self.assertEqual(anuncio.autor, self.professor)

    def test_polymorphic_query(self):
        from ensino.models.conteudo_turma import Post
        posts = Post.objects.all()
        self.assertEqual(posts.count(), 3)  # Espera os 3 posts criados acima
        for post in posts:
            print(f"Post type: {post.__class__.__name__}, title: {post.titulo}")
