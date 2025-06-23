# backend/usuarios/serializers.py

from rest_framework import serializers
from .models import Usuario, Aluno, Professor

class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer base para o modelo Usuario.

    Define os campos que serão expostos na API e como os dados
    de criação de usuário, especialmente a senha, devem ser tratados.
    """
    class Meta:
        model = Usuario
        # Lista dos campos do modelo que queremos expor na API.
        # Usamos 'public_id' como identificador público, e não o 'id' do banco.
        fields = ['public_id', 'email', 'name', 'type', 'password']

        # Campos que devem ser apenas de leitura na API.
        # O 'public_id' é gerado pelo sistema, então não deve ser editável.
        read_only_fields = ['public_id']

        # Configurações extras para campos específicos.
        extra_kwargs = {
            'password': {
                'write_only': True, # Garante que a senha NUNCA seja enviada na resposta da API.
                'style': {'input_type': 'password'}, # Ajuda na renderização de formulários da API.
                'min_length': 8 # Exemplo de validação: exigir senha mínima de 8 caracteres.
            }
        }
    
    def create(self, validated_data):
        """
        Sobrescreve o método de criação para usar o nosso UsuarioManager.

        Em vez de criar o usuário diretamente, delegamos a tarefa ao
        método 'create_user' do nosso manager, que já sabe como
        hashear (codificar) a senha de forma segura.

        Args:
            validated_data (dict): Dicionário com os dados já validados pelo serializer.

        Returns:
            Usuario: A instância do objeto Usuario que foi criada.
        """
        # Utiliza o manager para criar o usuário, passando os dados validados.
        # O **validated_data descompacta o dicionário em argumentos.
        user = Usuario.objects.create_user(**validated_data)
        return user


class AlunoSerializer(UsuarioSerializer):
    """
    Serializer específico para criar usuários do tipo Aluno.
    
    Herda do UsuarioSerializer e apenas garante que, no momento da criação,
    o tipo do usuário seja definido como 'ALUNO'.
    """
    def create(self, validated_data):
        # Define o tipo antes de chamar o método de criação do pai.
        validated_data['type'] = Usuario.UserType.ALUNO
        return super().create(validated_data)


class ProfessorSerializer(UsuarioSerializer):
    """
    Serializer específico para criar usuários do tipo Professor.

    Herda do UsuarioSerializer e apenas garante que, no momento da criação,
    o tipo do usuário seja definido como 'PROFESSOR'.
    """
    def create(self, validated_data):
        # Define o tipo antes de chamar o método de criação do pai.
        validated_data['type'] = Usuario.UserType.PROFESSOR
        return super().create(validated_data)