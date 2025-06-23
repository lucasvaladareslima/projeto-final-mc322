from django.urls import path
from ensino.views.turma_view import TurmaCreateView, TurmaListView
from ensino.views.disciplina_view import DisciplinaListView, DisciplinaCreateView
from ensino.views.conteudo_turma_view import PublicacaoListView, PublicacaoCreateView
from ensino.views.periodo_letivo_view import PeriodoLetivoListView, PeriodoLetivoCreateView

urlpatterns = [
    path('disciplina/', DisciplinaListView.as_view(), name='disciplina-list'),
    path('publicacao/', PublicacaoListView.as_view(), name='publicacao-list'),
    path('periodo-letivo/', PeriodoLetivoListView.as_view(), name='periodo-letivo-list'),
    path('turma/', TurmaListView.as_view(), name='turma-list'),
    path('turma/cadastrar/', TurmaCreateView.as_view(), name='turma-cadastrar'),
    path('disciplina/cadastrar/', DisciplinaCreateView.as_view(), name='disciplina-cadastrar'),
    path('publicacao/cadastrar/', PublicacaoCreateView.as_view(), name='publicacao-cadastrar'),
    path('periodo-letivo/cadastrar/', PeriodoLetivoCreateView.as_view(), name='periodo-letivo-cadastrar'),
]
