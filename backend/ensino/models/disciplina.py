from django.db import models
from usuarios.models import Usuario

class Disciplina(models.Model):
    """
    Modelo que representa uma disciplina no sistema.
    
    Cada disciplina possui um nome único e pode ser associada a várias turmas.
    """

    nome = models.CharField(max_length=100, unique=True)
    codigo = models.CharField(max_length=20, unique=True, blank=True, null=True)
    descricao = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.nome:
            raise ValueError("O nome da disciplina não pode ser vazio.")
        if not self.codigo:
            raise ValueError("O código da disciplina não pode ser vazio.")
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nome} ({self.codigo})"

    class Meta:
        verbose_name = 'Disciplina'
        verbose_name_plural = 'Disciplinas'

