# backend/usuarios/models.py
"""
Modelos de dados para a app 'usuarios'.

Este módulo define a estrutura para todos os usuários do sistema,
utilizando um modelo de usuário customizado que herda do AbstractUser do Django
e implementa um sistema de Proxy Models para diferenciar os papéis
(Aluno, Professor, Monitor) sem criar tabelas adicionais no banco de dados.
"""
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UsuarioManager(BaseUserManager):
    """
    Manager customizado para o modelo Usuario.

    Este manager sobrescreve os métodos padrão de criação de usuário para
    garantir que o processo seja compatível com o nosso modelo customizado,
    incluindo o tratamento do campo 'type' e a correta manipulação de senhas.
    """

    def create_user(self, username, email, password=None, **extra_fields):
        """Cria, salva e retorna um usuário padrão com email e senha.

        Este método normaliza o endereço de email, define a senha de forma
        segura usando hashing e salva o novo objeto de usuário no banco de dados.

        Args:
            username (str): O nome de usuário para o novo usuário.
            email (str): O endereço de email do novo usuário.
            password (str, optional): A senha em texto puro. Defaults to None.
            **extra_fields: Argumentos extras a serem passados para o modelo.

        Returns:
            Usuario: A instância do objeto Usuario que foi criada.
        
        Raises:
            ValueError: Se o campo de email não for fornecido.
        """
        if not email:
            raise ValueError('O campo de Email é obrigatório')
        
        email = self.normalize_email(email)
        user_type = extra_fields.pop('type', Usuario.UserType.ALUNO)
        user = self.model(username=username, email=email, type=user_type, **extra_fields)
        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """Cria e salva um superusuário com todos os privilégios.

        Utiliza o método create_user e define as flags 'is_staff' e 'is_superuser'
        como True. O tipo padrão para um superusuário é definido como Professor.

        Args:
            username (str): O nome de usuário para o superusuário.
            email (str): O endereço de email do superusuário.
            password (str, optional): A senha em texto puro. Defaults to None.
            **extra_fields: Argumentos extras a serem passados para o modelo.

        Returns:
            Usuario: A instância do objeto Usuario criada com privilégios de superuser.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('type', Usuario.UserType.PROFESSOR)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)


class Usuario(AbstractUser):
    """
    Modelo de usuário central do sistema.

    Este modelo herda de `AbstractUser` para aproveitar todo o sistema de
    autenticação e permissões do Django. Ele adiciona um campo `type`
    que é essencial para a lógica dos Modelos Proxy.
    """
    class UserType(models.TextChoices):
        """Define os papéis (tipos) de usuários disponíveis no sistema."""
        ALUNO = "ALUNO", "Aluno"
        PROFESSOR = "PROFESSOR", "Professor"

    type = models.CharField(
        max_length=50, 
        choices=UserType.choices, 
        default=UserType.ALUNO
    )

    objects = UsuarioManager()


class Aluno(Usuario):
    """
    Modelo Proxy para representar um usuário do tipo Aluno.

    Este modelo não cria uma nova tabela no banco de dados. Ele atua como
    uma "máscara" sobre o modelo `Usuario`, permitindo adicionar métodos e
    lógicas específicas para alunos, além de facilitar consultas filtradas.
    """
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        """Sobrescreve o método save para garantir que o tipo seja sempre ALUNO."""
        self.type = Usuario.UserType.ALUNO
        super().save(*args, **kwargs)

    def inscrever_em_turma(self, turma):
        """Futura implementação da lógica de inscrição de um aluno em uma turma."""
        print(f"Aluno {self.username} se inscrevendo na turma {turma}.")
        pass


class Professor(Usuario):
    """

    Modelo Proxy para representar um usuário do tipo Professor.
    """
    class Meta:
        proxy = True
        verbose_name = "Professor"

    def save(self, *args, **kwargs):
        """Sobrescreve o método save para garantir que o tipo seja sempre PROFESSOR."""
        self.type = Usuario.UserType.PROFESSOR
        super().save(*args, **kwargs)

    def criar_turma(self, nome_da_turma):
        """Futura implementação da lógica de criação de uma turma por um professor."""
        print(f"Professor {self.username} criando a turma {nome_da_turma}.")
        pass