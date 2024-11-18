# API de Autenticação com JWT

Essa API implementa um sistema de autenticação com **JWT (JSON Web Token)**, permitindo criar um novo operador (usuário), realizar o login e acessar uma rota protegida.

## Funcionalidades

- **Cadastro de Novo Operador** (`/novoOperador`)
- **Login do Operador** (`/login`)
- **Rota Protegida** (`/protegida`)

---

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/ArthurCoelhob/api-auth-nodejs.git
   ```
   ```bash
   cd api-auth-node.js
    ```

 2. **Instale as dependências**:
   ```bash
   npm install
   ```
 3. **Configure o seu banco de dados no arquivo .env**:
   ```bash
  DB_HOST=localhost
  DB_USER=postgres
  DB_PASS=senha
  DB_NAME=auth
  DB_PORT=5432
   ```

 4. **Inicie a aplicação com o seguinte comando**:
   ```bash
   npm run dev
   ```


## Testando com o Postman ou Insomnia

1. **Novo Operador**
- Método: POST
- URL: http://localhost:3000/novoOperador
- Body (JSON):

   ```bash
   {
    "operador": "meuusuario",
    "senha": "senha"
   }
   ```


2. **Login do Operador**
- Método: POST
- URL: http://localhost:3000/login
- Body (JSON):
   ```bash
   {
    "operador": "meuusuario",
    "senha": "senha"
   }
   ```
- Resposta: Receba o token JWT na resposta:

  ```bash
     {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0aWFvdmF2YSIsImlhdCI6MTczMTk2MDkxMCwiZXhwIjoxNzMxOTY0NTEwfQ.pCqN4Vo4ZONHIx3OvIIf5zflBxBjZ__CMxnPqO0iIeI"
     }
     ```

3. Rota Protegida
- Método: GET
- URL: http://localhost:3000/protegida
- Headers:
- Key: Authorization
- Value: Bearer <seu_token_aqui>
- Resposta: Verifique a resposta com as informações do operador autenticado:
 ```bash
     {
    "message": "Essa rota é privada",
    "user": {
      "id": 2,
      "username": "meuusuario"
    }
  }
   ```
