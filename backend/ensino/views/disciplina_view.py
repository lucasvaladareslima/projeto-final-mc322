from rest_framework import generics
from ensino.models.disciplina import Disciplina
from ensino.serializers.disciplina_serializer import DisciplinaSerializer

class DisciplinaListView(generics.ListAPIView):
    """View para listar disciplinas com filtros opcionais por código e nome."""

    serializer_class = DisciplinaSerializer

    def get_queryset(self):
        """Obtém a lista de disciplinas filtradas por código e nome.    
        Permite filtrar disciplinas por código exato (case-insensitive) e nome (case-insensitive).
        Args:
            request: Objeto de requisição HTTP que contém os parâmetros de filtro:
                - codigo (str): Código da disciplina para filtrar.
                - nome (str): Nome da disciplina para filtrar.
        Returns:
            QuerySet: Lista de disciplinas filtradas.
        """
        queryset = Disciplina.objects.all()
        codigo = self.request.query_params.get('codigo')
        nome = self.request.query_params.get('nome')

        if codigo:
            queryset = queryset.filter(codigo__iexact=codigo)  
        if nome:
            queryset = queryset.filter(nome__icontains=nome)  

        return queryset
    
class DisciplinaCreateView(generics.CreateAPIView):
    """View para criar uma nova disciplina.
    
    Permite que usuários criem uma nova disciplina no sistema.
    Args:
        request: Objeto de requisição HTTP que contém os dados da disciplina a ser criada com:
            - codigo (str): Código da disciplina.
            - nome (str): Nome da disciplina.
            - carga_horaria (int): Carga horária da disciplina em horas.
    Returns:
        Response: Dados da disciplina criada ou erro de validação.
    """
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer