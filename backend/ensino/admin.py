from django.contrib import admin

# Register your models here.
from .models import Disciplina, Turma, Anuncio, Material, Tarefa
admin.site.register(Disciplina)
admin.site.register(Turma)
admin.site.register(Anuncio)
admin.site.register(Material)
admin.site.register(Tarefa)