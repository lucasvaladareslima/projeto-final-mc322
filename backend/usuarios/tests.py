# backend/usuarios/tests.py
from django.test import TestCase
from .models import Usuario, Aluno, Professor

class UsuarioModelTest(TestCase):
    """
    Suite de testes para os modelos de usuário.
    """

    def test_criacao_de_professor_define_o_tipo_correto(self):
        """
        Verifica se ao criar um objeto usando o modelo Proxy 'Professor',
        o atributo 'type' no banco de dados é salvo como PROFESSOR.
        """

        dados_professor = {
            'name': 'prof_test',
            'email': 'prof@test.com',
            'password': '123'
        }

        # Usamos o manager do proxy Professor para criar o usuário.
        professor_criado = Professor.objects.create_user(**dados_professor)
        
        # Assert (Verificar): Checamos se o resultado foi o esperado.

        # Buscamos o mesmo usuário no banco de dados, mas através do modelo base Usuario.
        usuario_no_banco = Usuario.objects.get(name='prof_test')

        # Verificamos se o tipo do usuário salvo no banco é realmente 'PROFESSOR'.
        self.assertEqual(usuario_no_banco.type, Usuario.UserType.PROFESSOR)

    def test_criacao_de_aluno_define_o_tipo_correto(self):
        """
        Verifica se ao criar um objeto usando o modelo Proxy 'Aluno',
        o atributo 'type' no banco de dados é salvo como ALUNO.
        """
        aluno_criado = Aluno.objects.create_user(name='aluno_test', email='teste@gmail.com', password='123')
        self.assertEqual(aluno_criado.type, Usuario.UserType.ALUNO)

        # Verifica se o tipo do usuário criado não é PROFESSOR
        self.assertNotEqual(aluno_criado.type, Usuario.UserType.PROFESSOR)
    
