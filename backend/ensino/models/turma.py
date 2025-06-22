from django.db import models
from usuarios.models import Usuario
from ensino.models.disciplina import Disciplina
from ensino.models.periodo_letivo import PeriodoLetivo



class Turma(models.Model):  
    """
    Modelo que representa uma turma no sistema.

    Cada turma é associada a um professor e pode conter múltiplos alunos e monitores.
    """

    nome = models.CharField(max_length=100, unique=True)
    periodo_letivo = models.ForeignKey(
        PeriodoLetivo, 
        on_delete=models.CASCADE, 
        related_name='turmasPeriodoLetivo',
    )

    disciplina = models.ForeignKey(
        Disciplina, 
        on_delete=models.CASCADE, 
        related_name='turmasDisciplina',
    )

    professor = models.ForeignKey(
        Usuario, 
        on_delete=models.CASCADE, 
        limit_choices_to={'type': Usuario.UserType.PROFESSOR},
        related_name='turmasProfessor'
    )

    alunos = models.ManyToManyField(
        Usuario, 
        blank=True, 
        limit_choices_to={'type': Usuario.UserType.ALUNO},
        related_name='turmasAlunos'
    )

    monitores = models.ManyToManyField(
        Usuario, 
        blank=True, 
        limit_choices_to={'type': Usuario.UserType.MONITOR},
        related_name='turmasMonitores'
    )

    def save(self, *args, **kwargs):
        if not self.nome:
            raise ValueError("O nome da turma não pode ser vazio.")
        if not self.professor:
            raise ValueError("A turma deve ter um professor associado.")
        if not self.disciplina:
            raise ValueError("A turma deve estar associada a uma disciplina.")
        
        super().save(*args, **kwargs)

    def inscreverAluno(self, aluno):
        """
        Método para inscrever um aluno na turma.
        
        :param aluno: Instância do usuário do tipo Aluno a ser inscrito.
        """
        if aluno.type != Usuario.UserType.ALUNO:
            raise ValueError("O usuário deve ser do tipo Aluno para ser inscrito na turma.")
        if aluno in self.alunos.all():
            raise ValueError("O aluno já está inscrito nesta turma.")
        
        self.alunos.add(aluno)

    def adicionarMonitor(self, monitor):
        """
        Método para adicionar um monitor à turma.
        
        :param monitor: Instância do usuário do tipo Monitor a ser adicionado.
        """
        if monitor.type != Usuario.UserType.MONITOR:
            raise ValueError("O usuário deve ser do tipo Monitor para ser adicionado à turma.")
        if monitor in self.monitores.all():
            raise ValueError("O monitor já está adicionado a esta turma.")
        
        self.monitores.add(monitor)


    class Meta:
        verbose_name = 'Turma'
        verbose_name_plural = 'Turmas'