### Passos da Configuração

1.  **Acesse a pasta do backend:**
    Abra o terminal e navegue até a pasta `backend` do projeto.
    ```bash
    cd backend
    ```

2.  **Crie seu ambiente virtual local:**
    Isso cria uma pasta `venv` isolada para as dependências do projeto.
    ```bash
    python -m venv venv
    ```

3.  **Ative o ambiente virtual:**
    * **No Windows (CMD, PowerShell, VS Code):**
        ```bash
        .\venv\Scripts\activate
        ```
    * **No macOS ou Linux:**
        ```bash
        source venv/bin/activate
        ```
    > **Dica:** Você saberá que funcionou quando `(venv)` aparecer no início da linha do seu terminal.

4.  **Instale as dependências do projeto:**
    Este é o passo mais importante. Ele vai ler o arquivo `requirements.txt` e instalar as versões exatas de todos os pacotes que estamos usando.
    ```bash
    pip install -r requirements.txt
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    python manage.py runserver
    ```

### ✅ Verificação

Se tudo deu certo, o servidor iniciará sem erros. Acesse [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/)