from rest_framework import generics
from ensino.models.turma import Turma
from ensino.serializers.turma_serializer import TurmaSerializer

class TurmaCreateView(generics.CreateAPIView):
    """View para criar uma nova turma.
    Permite que usuários criem uma nova turma no sistema.
    Args:
        request: Objeto de requisição HTTP que contém os dados da turma a ser criada com:
            - nome (str): Nome da turma.
            - periodo_letivo (str): Período letivo da turma.
            - disciplina (str): Disciplina associada à turma.
            - professor (str): Professor responsável pela turma.
    Returns:
        Response: Dados da turma criada ou erro de validação.

    """
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer

class TurmaListView(generics.ListAPIView):
    """View para listar todas as turmas.
    Permite que usuários vejam todas as turmas cadastradas no sistema.
    Args:
        request: Objeto de requisição HTTP.
    Returns:
        Response: Lista de turmas com seus detalhes.
    """
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer


class TurmasAlunoListView(generics.ListAPIView):
    """View para listar turmas de um aluno específico.
    Permite que usuários vejam as turmas associadas a um aluno.
    Args:
        request: Objeto de requisição HTTP que contém o ID do aluno.
    Returns:
        Response: Lista de turmas associadas ao aluno.
    """
    serializer_class = TurmaSerializer

    def get_queryset(self):
        aluno_id = self.kwargs['aluno_id']
        return Turma.objects.filter(alunos__id=aluno_id)