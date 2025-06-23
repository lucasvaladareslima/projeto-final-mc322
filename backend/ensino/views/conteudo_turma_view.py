from rest_framework.generics import ListAPIView, CreateAPIView
from ensino.models.conteudo_turma import Publicacao, Material, Tarefa, Anuncio
from ensino.serializers.conteudo_turma_serializer import PublicacaoBaseSerializer, MaterialSerializer, TarefaSerializer, AnuncioSerializer

class PublicacaoListView(ListAPIView):
    serializer_class = PublicacaoBaseSerializer

    def get_queryset(self):
        """Obtém as publicações filtradas por turma e tipo.
        Permite filtrar publicações por turma_id e tipo (material, tarefa, anuncio).
        Args:
            request: Objeto de requisição HTTP que contém:
                - turma_id (str): ID da turma para filtrar as publicações.
                - type (str): Tipo de publicação a ser filtrado (material, tarefa, anuncio).
            
        Returns:
            QuerySet: Lista de publicações filtradas.
        """
        turma_id = self.request.query_params.get('turma_id')
        tipo = self.request.query_params.get('type')
        queryset = Publicacao.objects.all()
        if turma_id:
            queryset = queryset.filter(turma_id=turma_id)
        if tipo:
            tipo = tipo.lower()
            if tipo == 'material':
                queryset = Material.objects.all()
            elif tipo == 'tarefa':
                queryset = Tarefa.objects.all()
            elif tipo == 'anuncio':
                queryset = Anuncio.objects.all()
        return queryset
    
class PublicacaoCreateView(CreateAPIView):
    """View para criar uma nova publicação."""
    
    def get_serializer_class(self):
        """Obtém o serializer apropriado com base no tipo de publicação.
        Permite criar publicações de diferentes tipos (material, tarefa, anuncio).
        Args:
            request: Objeto de requisição HTTP que contém:
                - type (str): Tipo de publicação a ser criada (material, tarefa, anuncio).
        Returns:
            Serializer: Classe do serializer apropriado para o tipo de publicação."""

        tipo = self.request.data.get('type', '').lower()
        if tipo == 'material':
            return MaterialSerializer
        elif tipo == 'tarefa':
            return TarefaSerializer
        elif tipo == 'anuncio':
            return AnuncioSerializer
        else:
            raise ValueError('Tipo inválido de publicação (material, tarefa, anuncio).')

    def perform_create(self, serializer):
        """Salva a nova publicação com os dados fornecidos.
        Args:
            serializer: Instância do serializer com os dados da nova publicação.
        """
        serializer.save()