# backend/usuarios/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Aluno, Professor, Monitor

# Para exibir os campos customizados no admin
class CustomUserAdmin(UserAdmin):
    # Adiciona o campo 'type' na lista de campos exibidos ao criar/editar um usuário
    fieldsets = UserAdmin.fieldsets + (
        ('Tipo de Usuário', {'fields': ('type',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Tipo de Usuário', {'fields': ('type',)}),
    )

# Registra o modelo Usuario principal com a configuração customizada
admin.site.register(Usuario, CustomUserAdmin)

# Registra os modelos Proxy. Eles usarão a mesma interface do Usuario,
# mas aparecerão como seções separadas no admin.
admin.site.register(Aluno)
admin.site.register(Professor)
admin.site.register(Monitor)