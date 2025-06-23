from rest_framework import serializers
from ensino.models.disciplina import Disciplina

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = ['id', 'codigo', 'nome', 'descricao'] 
