from django.contrib import admin

# Register your models here.
from .models import Disciplina, Turma, Anuncio, Material, Tarefa, PeriodoLetivo, Forum, Post, Comentario, Tag
admin.site.register(Disciplina)
admin.site.register(Turma)
admin.site.register(Anuncio)
admin.site.register(Material)
admin.site.register(Tarefa)
admin.site.register(PeriodoLetivo)
admin.site.register(Forum)
admin.site.register(Post)
admin.site.register(Comentario)
admin.site.register(Tag)
