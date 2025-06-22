# backend/ensino/models/forum.py

from django.db import models
from usuarios.models import Usuario
from .disciplina import Turma # Importamos a Turma

class Forum(models.Model):
    """
    Representa o contêiner para todas as discussões de uma turma específica.
    """
    # Relação de um-para-um: cada Turma tem exatamente um Fórum.
    turma = models.OneToOneField(Turma, on_delete=models.CASCADE, related_name='forum')
    nome = models.CharField(max_length=150, default="Fórum de Discussão")

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
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='posts')
    autor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name='posts')
    titulo = models.CharField(max_length=200)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)
    
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
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name='comentarios')
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    marcado_como_resposta = models.BooleanField(default=False, help_text="Indica se este é o comentário que resolveu o post.")
    
    def __str__(self):
        return f'Comentário de {self.autor} em "{self.post.titulo}"'

    class Meta:
        ordering = ['data_criacao']


