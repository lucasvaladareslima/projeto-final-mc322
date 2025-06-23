from rest_framework import serializers
from ensino.models.turma import Turma

class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = ['id', 'nome', 'periodo_letivo', 'disciplina', 'professor']    
