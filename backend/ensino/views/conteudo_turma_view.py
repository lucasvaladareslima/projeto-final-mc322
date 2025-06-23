from rest_framework.generics import ListAPIView, CreateAPIView
from ensino.models.conteudo_turma import Publicacao, Material, Tarefa, Anuncio, EntregaTarefa
from ensino.serializers.conteudo_turma_serializer import PublicacaoBaseSerializer, MaterialSerializer, TarefaSerializer, AnuncioSerializer, EntregaTarefaSerializer
from django.utils import timezone

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
    
class MaterialCreateView(CreateAPIView):
    serializer_class = MaterialSerializer

    def perform_create(self, serializer):
        """Salva o material com o usuário autenticado como autor."""
        serializer.save(autor=self.request.user)

class TarefaCreateView(CreateAPIView):
    serializer_class = TarefaSerializer

    def perform_create(self, serializer):
        """Salva a tarefa com o usuário autenticado como autor."""
        serializer.save(autor=self.request.user)

class AnuncioCreateView(CreateAPIView):
    serializer_class = AnuncioSerializer

    def perform_create(self, serializer):
        """Salva o anúncio com o usuário autenticado como autor."""
        serializer.save(autor=self.request.user)


class EntregaTarefaCreateView(CreateAPIView):
    serializer_class = EntregaTarefaSerializer

    def perform_create(self, serializer):
        """Salva a entrega de tarefa com o usuário autenticado como aluno."""
        serializer.save(aluno=self.request.user)

class TarefasPendentesListView(ListAPIView):
    serializer_class = EntregaTarefaSerializer

    def get_queryset(self):
        """Obtém as entregas de tarefas pendentes do usuário autenticado.
        
        Filtra as entregas de tarefas onde o status é 'pendente' e o aluno é o usuário autenticado.
        
        Returns:
            QuerySet: Lista de entregas de tarefas pendentes do usuário autenticado.
        """
        aluno = self.request.user
        tarefas_em_prazo = Tarefa.objects.filter(data_entrega__gte=timezone.now())
        tarefas_pendentes = tarefas_em_prazo.exclude(entregas__aluno=aluno)
        return tarefas_pendentes