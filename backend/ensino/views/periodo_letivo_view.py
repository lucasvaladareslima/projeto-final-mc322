from rest_framework import generics
from ensino.models.periodo_letivo import PeriodoLetivo
from ensino.serializers.periodo_letivo_serializer import PeriodoLetivoSerializer

class PeriodoLetivoListView(generics.ListAPIView):
    """View para listar todos os períodos letivos."""
    
    queryset = PeriodoLetivo.objects.all()
    serializer_class = PeriodoLetivoSerializer

class PeriodoLetivoCreateView(generics.CreateAPIView):
    """View para criar um novo período letivo.
    
    Permite que usuários criem um novo período letivo no sistema.
    Args:
        request: Objeto de requisição HTTP que contém os dados do período letivo a ser criado com:
            - data_inicio (date): Data de início do período letivo.
            - data_fim (date): Data de fim do período letivo.
    Returns:
        Response: Dados do período letivo criado ou erro de validação.
    """
    queryset = PeriodoLetivo.objects.all()
    serializer_class = PeriodoLetivoSerializer