from django.test import TestCase
from ensino.models import Disciplina, Turma, Forum, Tag, Post, Comentario, PeriodoLetivo
from usuarios.models import Usuario
from ensino.exceptions import PermissaoNegadaError, ConteudoInvalidoError


class ForumModelsTest(TestCase):
    """
    Suite de testes para os modelos de Forum, Post e Comentario,
    incluindo a lógica de negócio e validações.
    """
    def setUp(self):
        """
        Configura um ambiente de teste com usuários, turma, fórum e tags.
        """
        # Cria usuários com diferentes papéis
        self.professor = Usuario.objects.create_user(
            name='professor1',
            email='prof1@example.com',
            password='senha123',
            type=Usuario.UserType.PROFESSOR
        )
        self.aluno = Usuario.objects.create_user(
            name='aluno1',
            email='aluno1@example.com',
            password='senha123',
            type=Usuario.UserType.ALUNO
        )
        self.monitor = Usuario.objects.create_user(
            name='monitor1',
            email='monitor1@example.com',
            password='senha123',
            type=Usuario.UserType.ALUNO
        )
        self.usuario_externo = Usuario.objects.create_user(
            name='Externo Fórum',
            email='Externo@example.com',
            password='senha123',
            type=Usuario.UserType.ALUNO
        )

        # Cria a estrutura de ensino
        self.disciplina = Disciplina.objects.create(nome="Testes de Software", codigo="TS101")
        self.turma = Turma.objects.create(
            nome="Turma de Teste", 
            disciplina=self.disciplina, 
            professor=self.professor,
            periodo_letivo=PeriodoLetivo.objects.create(ano=2025, semestre=1)
        )
        
        # Inscreve aluno e monitor na turma para testes de permissão
        self.turma.alunos.add(self.aluno)
        self.turma.monitores.add(self.monitor)

        # Cria o Fórum e as Tags
        self.forum = Forum.objects.create(turma=self.turma)
        self.tag1 = Tag.objects.create(nome="Dúvida")
        self.tag2 = Tag.objects.create(nome="Projeto")

    # --- Testes do Método adicionar_post ---

    def test_adicionar_post_sucesso(self):
        """Verifica se um membro da turma (aluno) pode criar um post com sucesso."""
        post = self.forum.adicionar_post(
            autor=self.aluno,
            titulo="Minha primeira dúvida",
            conteudo="Como configuro o ambiente?",
            tags=[self.tag1]
        )
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(post.autor, self.aluno)
        self.assertEqual(post.forum, self.forum)
        self.assertIn(self.tag1, post.tags.all())

    def test_adicionar_post_sem_permissao(self):
        """Verifica se um usuário externo à turma não pode criar um post."""
        with self.assertRaises(PermissaoNegadaError):
            self.forum.adicionar_post(
                autor=self.usuario_externo,
                titulo="Post de fora",
                conteudo="Não deveria funcionar."
            )

    def test_adicionar_post_titulo_invalido(self):
        """Verifica se a criação de post falha com título vazio ou com espaços."""
        with self.assertRaises(ConteudoInvalidoError):
            self.forum.adicionar_post(self.aluno, "   ", "Conteúdo válido")
        with self.assertRaises(ConteudoInvalidoError):
            self.forum.adicionar_post(self.aluno, "", "Conteúdo válido")

    def test_adicionar_post_conteudo_invalido(self):
        """Verifica se a criação de post falha com conteúdo vazio."""
        with self.assertRaises(ConteudoInvalidoError):
            self.forum.adicionar_post(self.aluno, "Título Válido", "   ")

    # --- Testes do Método adicionar_comentario ---

    def setUp_post_para_comentarios(self):
        """Cria um post base para ser usado nos testes de comentários."""
        return self.forum.adicionar_post(
            autor=self.aluno,
            titulo="Post para Comentários",
            conteudo="Podem comentar aqui."
        )

    def test_adicionar_comentario_sucesso(self):
        """Verifica se um membro da turma (professor) pode comentar."""
        post = self.setUp_post_para_comentarios()
        comentario = post.adicionar_comentario(
            autor=self.professor,
            conteudo="Ótima pergunta!"
        )
        self.assertEqual(post.comentarios.count(), 1)
        self.assertEqual(comentario.autor, self.professor)
        self.assertEqual(comentario.conteudo, "Ótima pergunta!")

    def test_adicionar_comentario_sem_permissao(self):
        """Verifica se um usuário externo não pode comentar."""
        post = self.setUp_post_para_comentarios()
        with self.assertRaises(PermissaoNegadaError):
            post.adicionar_comentario(self.usuario_externo, "Comentário de fora")

    def test_adicionar_comentario_conteudo_invalido(self):
        """Verifica se a criação de comentário falha com conteúdo vazio."""
        post = self.setUp_post_para_comentarios()
        with self.assertRaises(ConteudoInvalidoError):
            post.adicionar_comentario(self.aluno, "      ")


    def test_str_comentario_autor_removido(self):
        """Testa o __str__ de um comentário cujo autor foi deletado."""
        post = self.setUp_post_para_comentarios()
        comentario = post.adicionar_comentario(self.aluno, "Teste")
        
        # Deleta o autor do comentário
        self.aluno.delete()
        comentario.refresh_from_db() # Recarrega o objeto do banco de dados
        
        self.assertIsNone(comentario.autor)
        # A verificação do __str__ aqui pode variar, mas o importante é não dar erro.
        # Vamos assumir que você ajustará o __str__ para lidar com autor=None.
        # Ex: return f'Comentário de [Autor Removido] em "{self.post.titulo}"'
        self.assertIn("[Autor Removido]", str(comentario)) # Exemplo de verificação