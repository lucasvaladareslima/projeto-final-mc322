from django.contrib import admin

# Register your models here.
from .models import Disciplina, Turma
admin.site.register(Disciplina)
admin.site.register(Turma)