# <p align = "center"> Projeto RepoProvas </p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/98189571/180503768-2022af55-3dd6-4630-9909-9fbdfa739754.svg" alt="dp" height="140" width="140"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Matheus_Tassi-4dae71?style=flat-square" />
</p>

## :clipboard: Descrição

RepoProvas, um sistema de compartilhamento de provas entre estudantes! No RepoProvas qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros :)

---

## :computer: Tecnologias e Conceitos

- JWTs & refresh tokens
- Node.js
- Express.js
- TypeScript
- Postgresql
- Heroku
- Prisma
- jest & SuperTest

---

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": "fulano@gmail.com",
        "password": "12345"
    }
```

```yml
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
        "email": "fulano@gmail.com",
        "senha": "12345"
    }
```

```yml
POST /createtest (autenticada)
    - Rota para criar um novo teste
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name":"Higher Order Functions",
        "pdfUrl":"https://javascript.pdf",
        "categoryId":1,
        "teacherDisciplineId":2
    }
```

```yml
GET /testsbydisciplines (autenticada)
    - Rota para listar os testes a partir da disciplina
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /testsbyteachers (autenticada)
    - Rota para listar os testes a partir dos professores
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
---

## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/matheusfacciolla/projeto20-repoprovas
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev
```