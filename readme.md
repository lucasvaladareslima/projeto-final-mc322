# Documentação da API - Módulo de Usuários

## Visão Geral

Esta documentação descreve os endpoints disponíveis para o gerenciamento de usuários (Alunos e Professores), incluindo cadastro, autenticação e recuperação de dados.

* **URL Base da API:** `http://localhost:8000/api/`
* **Autenticação:** A API utiliza um sistema de **Sessões com Cookies**. Após um login bem-sucedido, o navegador do cliente guardará um cookie que será enviado automaticamente em todos os pedidos futuros para endpoints protegidos.

## Fluxo de Autenticação

O fluxo de interação recomendado para o frontend com a API de autenticação é o seguinte:

1.  **Ao Carregar a Aplicação:** O frontend deve primeiro chamar o endpoint `GET /api/me/`.
    * Se a resposta for `200 OK`, significa que o usuário já tem uma sessão válida. O frontend pode usar os dados retornados para popular a interface.
    * Se a resposta for `403 Forbidden`, o usuário não está logado, e o frontend deve exibir a página de login.
2.  **Login:** O usuário preenche o formulário de login, e o frontend faz um `POST /api/login/`. Se bem-sucedido, a aplicação pode redirecionar para o painel principal.
3.  **Logout:** Para encerrar a sessão, o frontend faz um `POST /api/logout/`.

---

## Referência dos Endpoints

### Autenticação e Sessão

---

#### 1. Cadastro de Novo Usuário

* **Endpoint:** `POST /api/cadastro/`
* **Descrição:** Permite a criação de um novo usuário, que pode ser do tipo `ALUNO` ou `PROFESSOR`.
* **Autenticação:** Pública.

* **Corpo do Pedido (Request Body):**

| Campo      | Tipo   | Obrigatório | Descrição                                        |
| :--------- | :----- | :---------- | :----------------------------------------------- |
| `email`    | String | Sim         | O email único do usuário. Será usado para login.   |
| `password` | String | Sim         | A senha do usuário (mínimo 8 caracteres).        |
| `name`     | String | Sim         | O nome completo do usuário.                      |
| `type`     | String | Sim         | O tipo de usuário. Deve ser `"ALUNO"` ou `"PROFESSOR"`. |

* **Exemplo de Pedido:**

    ```json
    {
        "email": "novo.aluno@email.com",
        "name": "Novo Aluno da Silva",
        "password": "senhaForte1234",
        "type": "ALUNO"
    }
    ```

* **Respostas:**
    * **`201 Created` (Sucesso):** Retorna o objeto do usuário recém-criado (sem a senha).
        ```json
        {
            "public_id": "a1b2c3d4-e5f6-4a5b-b6c7-d8e9f0a1b2c3",
            "email": "novo.aluno@email.com",
            "name": "Novo Aluno da Silva",
            "type": "ALUNO"
        }
        ```
    * **`400 Bad Request` (Erro de Validação):** Retorna um objeto com os erros específicos.
        ```json
        {
            "email": [
                "usuario com este Endereço de email já existe."
            ]
        }
        ```

---

#### 2. Realizar Login

* **Endpoint:** `POST /api/login/`
* **Descrição:** Autentica um usuário com email e senha e inicia uma sessão.
* **Autenticação:** Pública.

* **Corpo do Pedido (Request Body):**
    ```json
    {
        "email": "aluno.existente@email.com",
        "password": "senhaForte1234"
    }
    ```

* **Respostas:**
    * **`200 OK` (Sucesso):** Retorna os dados do usuário logado e define um cookie de sessão no navegador.
    * **`401 Unauthorized` (Erro):** Se as credenciais estiverem incorretas.
        ```json
        {
            "error": "Credenciais inválidas."
        }
        ```

---

#### 3. Obter Dados do Usuário Logado

* **Endpoint:** `GET /api/me/`
* **Descrição:** Retorna as informações do usuário atualmente autenticado. Ideal para ser chamado ao carregar a aplicação.
* **Autenticação:** Requer autenticação (sessão ativa).

* **Respostas:**
    * **`200 OK` (Sucesso):** Retorna o objeto completo do usuário logado.
    * **`403 Forbidden` (Erro):** Se não houver uma sessão de login ativa.

---

#### 4. Realizar Logout

* **Endpoint:** `POST /api/logout/`
* **Descrição:** Encerra a sessão do usuário atual.
* **Autenticação:** Requer autenticação.

* **Respostas:**
    * **`200 OK` (Sucesso):**
        ```json
        {
            "message": "Logout bem-sucedido."
        }
        ```
    * **`403 Forbidden` (Erro):** Se o usuário não estiver logado.

---

### Gerenciamento de Alunos e Professores (CRUD)

Os endpoints abaixo seguem o padrão RESTful e são gerenciados pelos `AlunoViewSet` e `ProfessorViewSet`. Todos requerem autenticação por padrão.

#### Endpoints de Alunos

* `GET /api/alunos/`
    * **Descrição:** Retorna uma lista de todos os usuários do tipo Aluno.
    * **Resposta de Sucesso (`200 OK`):** Uma lista de objetos de Aluno.

* `GET /api/alunos/{public_id}/`
    * **Descrição:** Retorna os detalhes de um Aluno específico usando seu `public_id`.
    * **Resposta de Sucesso (`200 OK`):** Um único objeto de Aluno.

* `PUT /api/alunos/{public_id}/`
    * **Descrição:** Atualiza todos os dados de um Aluno. Requer que todos os campos sejam enviados.

* `PATCH /api/alunos/{public_id}/`
    * **Descrição:** Atualiza parcialmente os dados de um Aluno. Apenas os campos a serem alterados precisam ser enviados.

* `DELETE /api/alunos/{public_id}/`
    * **Descrição:** Remove um Aluno do sistema.
    * **Resposta de Sucesso (`204 No Content`):** Uma resposta vazia indica sucesso.

#### Endpoints de Professores

* `GET /api/professores/`
    * **Descrição:** Retorna uma lista de todos os usuários do tipo Professor.

* `GET /api/professores/{public_id}/`
    * **Descrição:** Retorna os detalhes de um Professor específico.

* `PUT /api/professores/{public_id}/`
    * **Descrição:** Atualiza todos os dados de um Professor.

* `PATCH /api/professores/{public_id}/`
    * **Descrição:** Atualiza parcialmente os dados de um Professor.

* `DELETE /api/professores/{public_id}/`
    * **Descrição:** Remove um Professor do sistema.


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