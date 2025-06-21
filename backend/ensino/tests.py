from django.test import TestCase
from ensino.models import Disciplina, Turma
from usuarios.models import Usuario

class TurmaModelTest(TestCase):
    def setUp(self):
        # Cria uma disciplina
        self.disciplina = Disciplina.objects.create(nome="Matemática")

        # Cria um professor
        self.professor = Usuario.objects.create_user(
            username='professor1',
            email='prof1@example.com',
            password='senha123',
            type=Usuario.UserType.PROFESSOR
        )

        # Cria um aluno
        self.aluno = Usuario.objects.create_user(
            username='aluno1',
            email='aluno1@example.com',
            password='senha123',
            type=Usuario.UserType.ALUNO
        )

        # Cria um monitor
        self.monitor = Usuario.objects.create_user(
            username='monitor1',
            email='monitor1@example.com',
            password='senha123',
            type=Usuario.UserType.MONITOR
        )

        # Cria uma turma
        self.turma = Turma.objects.create(
            nome='Turma A',
            disciplina=self.disciplina,
            professor=self.professor
        )

    def test_inscrever_aluno(self):
        # Inscreve aluno
        self.turma.inscreverAluno(self.aluno)
        self.assertIn(self.aluno, self.turma.alunos.all())

    def test_adicionar_monitor(self):
        # Adiciona monitor
        self.turma.adicionarMonitor(self.monitor)
        self.assertIn(self.monitor, self.turma.monitores.all())

    def test_prevent_wrong_type_on_aluno(self):
        # Tenta inscrever um professor como aluno
        with self.assertRaises(ValueError):
            self.turma.inscreverAluno(self.professor)

    def test_prevent_wrong_type_on_monitor(self):
        # Tenta adicionar um aluno como monitor
        with self.assertRaises(ValueError):
            self.turma.adicionarMonitor(self.aluno)
