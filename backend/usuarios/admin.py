# backend/usuarios/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Aluno, Professor

# Criamos uma classe de Admin customizada para o nosso modelo Usuario
@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    """
    Configuração da área administrativa para o modelo Usuario.
    Customizada para funcionar sem o campo 'username'.
    """
    # Campos a serem exibidos na lista de usuários. Removemos 'username'.
    list_display = ('email', 'name', 'type', 'is_staff', 'is_active')
    
    # Campos que podem ser usados para busca. Removemos 'username'.
    search_fields = ('email', 'name')
    
    # Ordem de exibição. Esta é a correção direta para o seu erro.
    # Trocamos 'username' por 'email'.
    ordering = ('email',)
    
    # IMPORTANTE: Definimos os campos para a tela de EDIÇÃO.
    # Tivemos que recriar os 'fieldsets' do UserAdmin padrão, mas sem 'username'.
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Informações Pessoais", {"fields": ("name", "type")}),
        (
            "Permissões",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Datas Importantes", {"fields": ("last_login", "date_joined")}),
    )
    
    # IMPORTANTE: Definimos os campos para a tela de CRIAÇÃO de um novo usuário.
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            # Incluímos o campo 'name' que agora é obrigatório (REQUIRED_FIELDS).
            "fields": ("email", "name", "password", "password2"),
        }),
    )

    # Mantém os filtros úteis na barra lateral.
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'type')

# Registra os modelos Proxy para que apareçam separadamente no Admin.
# Eles usarão a configuração do UsuarioAdmin definida acima.
admin.site.register(Aluno)
admin.site.register(Professor)
