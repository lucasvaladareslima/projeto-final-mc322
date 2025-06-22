from django.contrib import admin

# Register your models here.
from .models import Disciplina, Turma, Post, Comentario, Tag, Forum
admin.site.register(Disciplina)
admin.site.register(Turma)
admin.site.register(Forum)
admin.site.register(Post)
admin.site.register(Comentario)
admin.site.register(Tag)