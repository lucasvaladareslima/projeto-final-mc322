# backend/usuarios/views.py

from rest_framework.viewsets import ModelViewSet
from .models import Aluno, Professor
from .serializers import AlunoSerializer, ProfessorSerializer

class AlunoViewSet(ModelViewSet):
    """
    ViewSet para gerenciar os Alunos.

    Fornece as operações de CRUD (Listar, Criar, Recuperar, Atualizar, Deletar)
    para o modelo de Aluno.
    """
    # queryset: Define a coleção de objetos que esta view irá operar.
    # Graças ao nosso manager em models.py, Aluno.objects.all() retorna
    # apenas os usuários com type='ALUNO'.
    queryset = Aluno.objects.all()

    # serializer_class: Especifica o serializer a ser usado para converter
    # os objetos Aluno de/para JSON.
    serializer_class = AlunoSerializer

    # lookup_field: MUITO IMPORTANTE! Define qual campo do modelo será usado
    # para buscar um objeto individual. Em vez do 'id' padrão, usamos
    # nosso 'public_id' seguro.
    lookup_field = 'public_id'


class ProfessorViewSet(ModelViewSet):
    """
    ViewSet para gerenciar os Professores.

    Fornece as operações de CRUD (Listar, Criar, Recuperar, Atualizar, Deletar)
    para o modelo de Professor.
    """
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    lookup_field = 'public_id'
