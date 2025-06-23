# backend/ensino/views/forum_view.py

"""
Este módulo contém as Views (a lógica da API) para a funcionalidade de Fórum.

Cada ViewSet aqui define um conjunto de ações (listar, criar, recuperar, etc.)
para um recurso específico do fórum, como Posts e Comentários.
"""


from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from ..models.turma import Turma
from ..models.forum import Forum, Post, Comentario, Tag
from ..serializers.forum_serializer import PostSerializer, ComentarioSerializer, TagSerializer, ForumSerializer

class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Posts.

    Fornece ações de CRUD para os posts e é projetado para ser usado
    de forma aninhada sob as turmas, garantindo que os posts sempre
    pertençam a um contexto de turma.
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Sobrescreve o queryset padrão para filtrar os resultados.

        - Se a URL for aninhada (`/turma/{id}/posts/`), retorna apenas os posts
          do fórum daquela turma.
        - Se a URL for de alto nível (`/posts/{id}/`), retorna todos os posts
          para permitir as ações de detalhe, atualização e exclusão.
        """

        turma_pk = self.kwargs.get('turma_pk')
        if turma_pk:
            return Post.objects.filter(forum__turma_id=turma_pk)
        return Post.objects.all()

    def create(self, request, *args, **kwargs):
        """
        Sobrescreve o método de criação para associar o novo post
        automaticamente ao fórum da turma (da URL) e ao autor (usuário logado).
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        turma_pk = self.kwargs.get('turma_pk')
        turma = get_object_or_404(Turma, pk=turma_pk)
        
        # Chamamos o método do modelo, que retorna o post criado
        post_criado = turma.forum.adicionar_post(
            autor=self.request.user,
            titulo=serializer.validated_data.get('titulo'),
            conteudo=serializer.validated_data.get('conteudo')
        )
        
        # Serializamos o post recém-criado para a resposta
        headers = self.get_success_headers(serializer.data)
        return Response(PostSerializer(post_criado).data, status=status.HTTP_201_CREATED, headers=headers)

class ComentarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Comentários de um Post.
    Projetado para ser usado aninhado sob um post específico.
    """
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filtra os comentários para retornar apenas aqueles do post
        especificado pelo `post_pk` na URL.
        """
        post_pk = self.kwargs.get('post_pk')
        if post_pk:
            return Comentario.objects.filter(post_id=post_pk)
        return Comentario.objects.all()

    def create(self, request, *args, **kwargs):
        """
        Cria um novo comentário e o associa ao post da URL e ao autor logado.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post = get_object_or_404(Post, pk=self.kwargs['post_pk'])
        
        comentario_criado = post.adicionar_comentario(
            autor=self.request.user,
            conteudo=serializer.validated_data.get('conteudo')
        )
        
        headers = self.get_success_headers(serializer.data)
        return Response(ComentarioSerializer(comentario_criado).data, status=status.HTTP_201_CREATED, headers=headers)

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet para visualizar Tags. Apenas leitura."""
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

class ForumViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet para visualizar Fóruns. Apenas leitura."""
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer
    permission_classes = [IsAuthenticated]