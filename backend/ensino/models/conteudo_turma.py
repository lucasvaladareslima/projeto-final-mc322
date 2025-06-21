from polymorphic.models import PolymorphicModel
from django.db import models
from usuarios.models import Usuario
from ensino.models.turma import Turma

class Post(PolymorphicModel):
    """
    Modelo que representa um post no sistema.

    Cada post é associado a um usuário e pode conter múltiplos comentários.
    """

    titulo = models.CharField(max_length=200)
    conteudo = models.TextField()
    autor = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    turma = models.ForeignKey(
        Turma,
        on_delete=models.CASCADE,
        related_name='posts',
    )
    
    data_criacao = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = False # Não é modelo abstrato, pois será usado como base para outros modelos de post.(polymorfismo)


class Material(Post):
    """
    Modelo que representa um material postado em uma turma.

    Herda de Post e adiciona campos específicos para materiais.
    """

    arquivo = models.FileField(upload_to='materiais/')

    def save(self, *args, **kwargs):
        if not self.arquivo:
            raise ValueError("O arquivo do material não pode ser vazio.")
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Material'
        verbose_name_plural = 'Materiais'

class Tarefa(Post):
    """
    Modelo que representa uma tarefa postada em uma turma.

    Herda de Post e adiciona campos específicos para tarefas.
    """

    data_entrega = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.data_entrega:
            raise ValueError("A data de entrega da tarefa não pode ser vazia.")
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Tarefa'
        verbose_name_plural = 'Tarefas'

class Anuncio(Post):
    """
    Modelo que representa um anúncio postado em uma turma.

    Herda de Post e não adiciona campos específicos, servindo apenas como um tipo de post.
    """

    def save(self, *args, **kwargs):
        if not self.titulo or not self.conteudo:
            raise ValueError("O título e o conteúdo do anúncio não podem ser vazios.")
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Anúncio'
        verbose_name_plural = 'Anúncios'