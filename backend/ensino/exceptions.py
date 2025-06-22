"""
Exceções customizadas para a aplicação 'ensino'.
"""

class EnsinoException(Exception):
    """Classe base para exceções nesta aplicação."""
    pass

class ConteudoInvalidoError(EnsinoException):
    """Lançada quando um conteúdo (título, corpo de texto) é inválido."""
    pass

class PermissaoNegadaError(EnsinoException):
    """Lançada quando um usuário tenta realizar uma ação sem permissão."""
    pass