# backend/ensino/urls.py
"""
Este módulo define todos os padrões de URL para a aplicação 'ensino'.

Ele combina rotas "planas" para recursos simples (como Disciplina) com
rotas "aninhadas" para recursos hierárquicos (como o Fórum),
mantendo a compatibilidade com as views existentes.
"""

from django.urls import path, include
from rest_framework_nested import routers

from ensino.views.turma_view import TurmaCreateView, TurmaListView, TurmasAlunoListView
from ensino.views.disciplina_view import DisciplinaListView, DisciplinaCreateView
from ensino.views.conteudo_turma_view import PublicacaoListView, MaterialCreateView, TarefaCreateView, AnuncioCreateView, EntregaTarefaCreateView, TarefasPendentesListView 
from ensino.views.periodo_letivo_view import PeriodoLetivoListView, PeriodoLetivoCreateView

from ensino.views.forum_view import ForumViewSet, PostViewSet, ComentarioViewSet, TagViewSet

urlpatterns = [
    path('disciplina/', DisciplinaListView.as_view(), name='disciplina-list'),
    path('publicacao/', PublicacaoListView.as_view(), name='publicacao-list'),
    path('publicacao/tarefas-pendentes/', TarefasPendentesListView.as_view(), name='tarefas-pendentes-list'),
    path('periodo-letivo/', PeriodoLetivoListView.as_view(), name='periodo-letivo-list'),
    path('turma/', TurmaListView.as_view(), name='turma-list'),
    path('turma/aluno/<int:aluno_id>/', TurmasAlunoListView.as_view(), name='turmas-aluno-list'),
    path('turma/cadastrar/', TurmaCreateView.as_view(), name='turma-cadastrar'),
    path('disciplina/cadastrar/', DisciplinaCreateView.as_view(), name='disciplina-cadastrar'),
    path('periodo-letivo/cadastrar/', PeriodoLetivoCreateView.as_view(), name='periodo-letivo-cadastrar'),
    path('publicacao/material/cadastrar/', MaterialCreateView.as_view(), name='material-cadastrar'),
    path('publicacao/tarefa/cadastrar/', TarefaCreateView.as_view(), name='tarefa-cadastrar'),
    path('publicacao/anuncio/cadastrar/', AnuncioCreateView.as_view(), name='anuncio-cadastrar'),
    path('publicacao/entrega-tarefa/cadastrar/', EntregaTarefaCreateView.as_view(), name='entrega-tarefa-cadastrar'),
]


# Lista de URLs adicionais para o Fórum
urlpatterns_forum = [
    # Endpoint para listar todas as Tags. Ex: GET /api/ensino/tags/
    path('tags/', TagViewSet.as_view({'get': 'list'}), name='tag-list'),

    # Endpoint para ações de detalhe de um Post (ver, atualizar, deletar).
    # Ex: GET /api/ensino/posts/5/
    path('posts/<int:pk>/', PostViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='post-detail'),

     # Rota aninhada para Posts DENTRO de uma Turma.
    # Ex: GET ou POST para /api/ensino/turma/1/posts/
    path('turma/<int:turma_pk>/posts/', PostViewSet.as_view({
        'get': 'list',    # GET neste URL lista os posts da turma
        'post': 'create'  # POST neste URL cria um post na turma
    }), name='turma-posts'),

    # Rota aninhada para Comentários DENTRO de um Post.
    # Ex: GET ou POST para /api/ensino/posts/5/comentarios/
    path('posts/<int:post_pk>/comentarios/', ComentarioViewSet.as_view({
        'get': 'list',    # GET neste URL lista os comentários do post
        'post': 'create'  # POST neste URL cria um comentário no post
    }), name='post-comentarios'),
]

# Adicionamos as novas URLs do fórum à lista principal.
urlpatterns += urlpatterns_forum