# backend/ensino/serializers/forum_serializer.py
"""
Este módulo contém os serializers para os modelos da funcionalidade de Fórum.

Os serializers são responsáveis por converter os objetos complexos dos modelos
(como Post, Comentario) em tipos de dados Python nativos que podem ser
facilmente renderizados em JSON para a nossa API (serialização), e vice-versa (desserialização).
"""

from rest_framework import serializers

# Importamos os modelos do fórum
from ..models.forum import Forum, Post, Comentario, Tag
# Importamos o serializer de usuário para aninhar informações do autor
from usuarios.serializers import UsuarioSerializer

class TagSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Tag. Converte o objeto Tag em JSON.
    """
    class Meta:
        model = Tag
        fields = ['id', 'nome']


class ComentarioSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Comentario.

    Fornece uma representação detalhada de um comentário, incluindo os
    dados completos do autor, em vez de apenas o seu ID.
    """

    # Aninhamento de Leitura: Usa o UsuarioSerializer para mostrar os detalhes
    # do autor, tornando a resposta da API mais rica e útil para o frontend.
    # É 'read_only' porque o autor será definido pela view, não enviado pelo cliente.
    autor = UsuarioSerializer(read_only=True)

    class Meta:
        model = Comentario
        fields = ['id', 'conteudo', 'autor', 'data_criacao']


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Post.

    Cria uma resposta aninhada (nested) que inclui os detalhes do autor,
    uma lista de tags associadas e uma lista de todos os comentários do post,
    evitando que o frontend precise fazer múltiplos pedidos.
    """

    autor = UsuarioSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    #Aninhamento Reverso: Automaticamente inclui todos os comentários
    # relacionados a este post na resposta da API.
    comentarios = ComentarioSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'titulo', 'conteudo', 'autor',
            'data_criacao', 'tags', 'comentarios'
        ]


class ForumSerializer(serializers.ModelSerializer):
    """
    Serializer para o Fórum.

    Fornece uma visão geral do fórum, incluindo a lista de posts associados.
    """
    posts = PostSerializer(many=True, read_only=True)
    
    # Usa a representação de string do modelo Turma (__str__) para o campo 'turma'.
    # Ex: "MC322 - Turma A (2025 - 1º Semestre)"
    turma = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Forum
        fields = ['id', 'nome', 'turma', 'posts']