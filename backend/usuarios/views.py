# backend/usuarios/views.py

from django.contrib.auth import authenticate, login, logout
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Aluno, Professor
from .serializers import AlunoSerializer, ProfessorSerializer, UsuarioSerializer

from django.http import JsonResponse
from django.middleware.csrf import get_token

@api_view(['POST'])
@permission_classes([AllowAny]) # Permite que qualquer um (não logado) aceda a esta view.
def cadastro_view(request):
    """
    View para o cadastro de novos usuários.
    Qualquer um pode se cadastrar como Aluno ou Professor.
    """
    serializer_class = None
    user_type = request.data.get('type')

    if user_type == 'ALUNO':
        serializer_class = AlunoSerializer
    elif user_type == 'PROFESSOR':
        serializer_class = ProfessorSerializer
    else:
        return Response(
            {"error": "Tipo de usuário inválido. Escolha 'ALUNO' ou 'PROFESSOR'."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    serializer = serializer_class(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny]) # Permite acesso público para fazer o login.
def login_view(request):
    """
    View para autenticar e iniciar uma sessão de usuário.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)

    if user is not None:
        login(request, user) # Cria a sessão para o usuário
        # Retornamos os dados do usuário logado usando o serializer genérico
        return Response(UsuarioSerializer(user).data)
    else:
        return Response(
            {"error": "Credenciais inválidas."},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
@api_view(['GET'])
# A permissão já é garantida pelo padrão em settings.py,
# mas ser explícito aqui ajuda na clareza.
@permission_classes([IsAuthenticated])
def me_view(request):
    """
    Retorna os dados do usuário atualmente autenticado.
    """
    # O Django e o DRF, ao verem o cookie de sessão, já preencheram
    # o 'request.user' com o objeto do usuário logado.
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated]) # Só um usuário logado pode fazer logout.
def logout_view(request):
    """
    Encerra a sessão do usuário atual.
    """
    logout(request)
    return Response({"message": "Logout bem-sucedido."})


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


class CSRFTokenView(APIView):
    authentication_classes = []  # Não requer autenticação
    permission_classes = [AllowAny]      # Sem permissões especiais
    
    def get(self, request):
        token = get_token(request)
        response = Response({"csrfToken": token})
        response.set_cookie(
            'csrftoken',
            token,
            max_age=60 * 60 * 24 * 7,  # 1 semana
            httponly=False,
            samesite='Lax',
            secure=False  # True em produção com HTTPS
        )
    
        return response
