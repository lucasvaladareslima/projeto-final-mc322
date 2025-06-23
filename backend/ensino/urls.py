from django.urls import path
from ensino.views.turma_view import TurmaCreateView, TurmaListView, TurmasAlunoListView
from ensino.views.disciplina_view import DisciplinaListView, DisciplinaCreateView
from ensino.views.conteudo_turma_view import PublicacaoListView, MaterialCreateView, TarefaCreateView, AnuncioCreateView, EntregaTarefaCreateView, TarefasPendentesListView, 
from ensino.views.periodo_letivo_view import PeriodoLetivoListView, PeriodoLetivoCreateView

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
