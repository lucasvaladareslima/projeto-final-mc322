from rest_framework import serializers
from ensino.models.conteudo_turma import Publicacao, Material, Tarefa, Anuncio

class PublicacaoBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacao
        fields = '__all__'

class MaterialSerializer(PublicacaoBaseSerializer):
    class Meta(PublicacaoBaseSerializer.Meta):
        model = Material

class TarefaSerializer(PublicacaoBaseSerializer):
    class Meta(PublicacaoBaseSerializer.Meta):
        model = Tarefa

class AnuncioSerializer(PublicacaoBaseSerializer):
    class Meta(PublicacaoBaseSerializer.Meta):
        model = Anuncio
