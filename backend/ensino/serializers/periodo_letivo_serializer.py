from rest_framework import serializers
from ensino.models.periodo_letivo import PeriodoLetivo

class PeriodoLetivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodoLetivo
        fields = ['id', 'ano', 'semestre']

