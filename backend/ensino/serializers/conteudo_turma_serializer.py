from rest_framework import serializers
from ensino.models.conteudo_turma import Publicacao, Material, Tarefa, Anuncio, EntregaTarefa

class PublicacaoBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacao
        fields = '__all__'

class MaterialSerializer(PublicacaoBaseSerializer):
    class Meta(PublicacaoBaseSerializer.Meta):
        model = Material
        fields = ['id', 'titulo', 'conteudo', 'autor', 'turma', 'data_publicacao', 'arquivo']

class TarefaSerializer(PublicacaoBaseSerializer):
    class Meta(PublicacaoBaseSerializer.Meta):
        model = Tarefa
        fields = ['id', 'titulo', 'conteudo', 'autor', 'turma', 'data_publicacao', 'data_entrega', 'nota_maxima']

class AnuncioSerializer(PublicacaoBaseSerializer):
    class Meta(PublicacaoBaseSerializer.Meta):
        model = Anuncio
        fields = ['id', 'titulo', 'conteudo', 'autor', 'turma', 'data_publicacao']

class EntregaTarefaSerializer(serializers.ModelSerializer):
    tarefa = TarefaSerializer(read_only=True)

    class Meta:
        model = EntregaTarefa
        fields = ['id', 'tarefa', 'aluno', 'data_entrega', 'nota']
        read_only_fields = ['id', 'tarefa', 'aluno']  # Aluno é determinado pelo usuário autenticado