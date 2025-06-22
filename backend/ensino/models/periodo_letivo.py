from django.db import models

class PeriodoLetivo(models.Model):
    """
    Modelo que representa um período letivo no sistema.

    Cada período letivo possui um nome e pode ser associado a várias turmas.
    """

    ano = models.PositiveIntegerField()
    semestre = models.IntegerField(
        choices=[
            (1, '1º Semestre'),
            (2, '2º Semestre'),
        ],
    )

    def save(self, *args, **kwargs):
        if not self.ano:
            raise ValueError("O ano do período letivo não pode ser vazio.")
        if self.semestre not in [1, 2]:
            raise ValueError("O semestre deve ser 1 ou 2.")
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.ano} - {self.get_semestre_display()}"

    class Meta:
        verbose_name = 'Período Letivo'
        verbose_name_plural = 'Períodos Letivos'