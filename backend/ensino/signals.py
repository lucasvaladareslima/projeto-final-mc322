# backend/ensino/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models.turma import Turma
from .models.forum import Forum

# O decorator @receiver liga a nossa função ao sinal post_save da Turma
@receiver(post_save, sender=Turma)
def criar_forum_para_nova_turma(sender, instance, created, **kwargs):
    """
    Cria um Forum automaticamente sempre que uma nova Turma é criada.
    """
    # A variável 'created' é True apenas na primeira vez que o objeto é salvo.
    if created:
        Forum.objects.create(turma=instance)
        print(f"Fórum criado para a turma '{instance.nome}'.")