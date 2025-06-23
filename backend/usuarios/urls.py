# backend/usuarios/urls.py

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AlunoViewSet, ProfessorViewSet

# Cria uma instância do router padrão. O Router gera as URLs para os ViewSets.
router = DefaultRouter()

# Registra o AlunoViewSet com o router.
# Isto cria as URLs como /api/alunos/ e /api/alunos/{public_id}/
router.register(r'alunos', AlunoViewSet, basename='aluno')

# Registra o ProfessorViewSet com o router.
# Isto cria as URLs como /api/professores/ e /api/professores/{public_id}/
router.register(r'professores', ProfessorViewSet, basename='professor')

# A variável que o Django procura.
# Ela contém todas as URLs geradas automaticamente pelo router.
urlpatterns = [
    path('', include(router.urls)),
]