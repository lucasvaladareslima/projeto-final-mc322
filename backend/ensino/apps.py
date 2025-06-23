from django.apps import AppConfig


class EnsinoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ensino'

    def ready(self):
        """
        Este método é executado pelo Django uma única vez quando a aplicação é carregada.
        É o local oficial e correto para importar os sinais e garantir que eles
        sejam registrados e estejam prontos para serem disparados.
        """
        # Ao importar o módulo de sinais aqui, o decorador @receiver é executado
        # e o nosso "gatilho" fica ativo.
        import ensino.signals
