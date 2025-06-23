# backend/ensino/models/forum.py

from django.db import models
from usuarios.models import Usuario
from .turma import Turma # Importamos a Turma
from ..exceptions import ConteudoInvalidoError, PermissaoNegadaError


class Forum(models.Model):
    """
    Representa o contêiner para todas as discussões de uma turma específica.
    """
    # Relação de um-para-um: cada Turma tem exatamente um Fórum.
    turma = models.OneToOneField(
        Turma, 
        on_delete=models.CASCADE, 
        related_name='forum'
    )
    nome = models.CharField(max_length=150, default="Fórum de Discussão")

    def adicionar_post(self, autor, titulo, conteudo, tags=None):
        """Cria e adiciona um novo post a este fórum."""
        # Validação de permissão
        membros_permitidos = list(self.turma.alunos.all()) + list(self.turma.monitores.all())
        if autor != self.turma.professor and autor not in membros_permitidos:
            raise PermissaoNegadaError("O autor não tem permissão para postar neste fórum.")

        # Validação de conteúdo
        if not titulo or not titulo.strip():
            raise ConteudoInvalidoError("O título não pode ser vazio.")
        if not conteudo or not conteudo.strip():
            raise ConteudoInvalidoError("O conteúdo não pode ser vazio.")

        post = Post.objects.create(
            forum=self,
            autor=autor,
            titulo=titulo,
            conteudo=conteudo
        )
        if tags:
            post.tags.set(tags)
        return post

    def posts_recentes(self, limite=5):
        """Retorna os posts mais recentes deste fórum"""
        return self.posts.all().order_by('-data_criacao')[:limite]
    
    def __str__(self):
        return f"Fórum da {self.turma.nome}"

class Tag(models.Model):
    """
    Representa uma tag ou categoria que pode ser associada a um Post.
    Ex: 'Dúvida de Conteúdo', 'Administrativo'.
    """
    nome = models.CharField(max_length=50, unique=True, help_text="Nome da tag, ex: Dúvida de Conteúdo")

    def __str__(self):
        return self.nome


class Post(models.Model):
    """
    Representa uma postagem (um tópico) dentro de um Fórum.
    """
    forum = models.ForeignKey(
        Forum, 
        on_delete=models.CASCADE, 
        related_name='posts'
    )
    autor = models.ForeignKey(
        Usuario, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='posts'
    )
    titulo = models.CharField(max_length=200)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)
    
    def adicionar_comentario(self, autor, conteudo):
        """Adiciona um comentário ao post"""

        turma_do_post = self.forum.turma
        membros_permitidos = list(turma_do_post.alunos.all()) + list(turma_do_post.monitores.all())
        
        if autor != turma_do_post.professor and autor not in membros_permitidos:
            raise PermissaoNegadaError("O autor não tem permissão para comentar neste post.")

        # Validação de conteúdo
        if not conteudo or not conteudo.strip():
            raise ConteudoInvalidoError("O conteúdo do comentário não pode ser vazio.")

        comentario = Comentario(
            post=self, 
            autor=autor, 
            conteudo=conteudo
        )
        comentario.save()
        return comentario

    def get_comentarios_ordenados(self, ordem='antigos'):
        """Retorna comentários ordenados conforme solicitado"""
        if ordem == 'recentes':
            return self.comentarios.order_by('-data_criacao')
        else:  # 'antigos' (padrão)
            return self.comentarios.order_by('data_criacao')
    
    def __str__(self):
        return self.titulo

    class Meta:
        ordering = ['-data_criacao']


class Comentario(models.Model):
    """
    Representa um comentário em resposta a um Post no fórum.
    """
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE, 
        related_name='comentarios'
    )
    autor = models.ForeignKey(
        Usuario, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='comentarios'
    )
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        autor_str = self.autor.username if self.autor else "[Autor Removido]"
        return f'Comentário de {autor_str} em "{self.post.titulo}"'

    class Meta:
        ordering = ['data_criacao']


