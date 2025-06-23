from polymorphic.models import PolymorphicModel
from django.db import models
from usuarios.models import Usuario
from ensino.models.turma import Turma

class Publicacao(PolymorphicModel):
    """
    Modelo que representa um post no sistema.

    Cada post é associado a um usuário e pode conter múltiplos comentários.
    """

    titulo = models.CharField(max_length=200)
    conteudo = models.TextField()
    autor = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='publicacoes'
    )
    turma = models.ForeignKey(
        Turma,
        on_delete=models.CASCADE,
        related_name='publicacoes',
    )
    
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} - {self.autor.username} ({self.turma.nome})"

    class Meta:
        abstract = False # Não é modelo abstrato, pois será usado como base para outros modelos de post.(polymorfismo)


class Material(Publicacao):
    """
    Modelo que representa um material postado em uma turma.

    Herda de Post e adiciona campos específicos para materiais.
    """

    arquivo = models.FileField(upload_to='materiais/')

    def save(self, *args, **kwargs):
        if not self.arquivo:
            raise ValueError("O arquivo do material não pode ser vazio.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Material: {self.titulo} - {self.autor.username} ({self.turma.nome})"

    class Meta:
        verbose_name = 'Material'
        verbose_name_plural = 'Materiais'


class Tarefa(Publicacao):
    """
    Modelo que representa uma tarefa postada em uma turma.

    Herda de Post e adiciona campos específicos para tarefas.
    """

    data_entrega = models.DateTimeField()
    
    nota_maxima = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=10.0,
        help_text="Nota máxima da tarefa."
    )

    def save(self, *args, **kwargs):
        if not self.data_entrega:
            raise ValueError("A data de entrega da tarefa não pode ser vazia.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Tarefa: {self.titulo} - {self.autor.username} ({self.turma.nome})"

    class Meta:
        verbose_name = 'Tarefa'
        verbose_name_plural = 'Tarefas'


class Anuncio(Publicacao):
    """
    Modelo que representa um anúncio postado em uma turma.

    Herda de Post e não adiciona campos específicos, servindo apenas como um tipo de post.
    """

    def save(self, *args, **kwargs):
        if not self.titulo or not self.conteudo:
            raise ValueError("O título e o conteúdo do anúncio não podem ser vazios.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Anúncio: {self.titulo} - {self.autor.username} ({self.turma.nome})"

    class Meta:
        verbose_name = 'Anúncio'
        verbose_name_plural = 'Anúncios'


class EntregaTarefa(models.Model):
    """
    Modelo que representa a entrega de uma tarefa por um aluno.

    Cada entrega está associada a uma tarefa específica e a um aluno.
    """

    tarefa = models.ForeignKey(Tarefa, on_delete=models.CASCADE, related_name='entregas')
    aluno = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='entregas_tarefas')
    conteudo = models.TextField()
    arquivo = models.FileField(
        upload_to='entregas_tarefas/',
        blank=True,
        null=True,
        help_text="Arquivo enviado pelo aluno como entrega da tarefa."
    )
    data_entrega = models.DateTimeField(auto_now_add=True)
    nota_obtida = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        blank=True, 
        null=True,
        help_text="Nota da entrega, se aplicável."
    )

    def __str__(self):
        return f"Entrega de {self.aluno.username} para {self.tarefa.titulo} ({self.tarefa.turma.nome})"
    
    class Meta:
        verbose_name = 'Entrega de Tarefa'
        verbose_name_plural = 'Entregas de Tarefas'
        unique_together = ('tarefa', 'aluno')