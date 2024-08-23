import express from "express";

const app = express(); // criando uma instância do Express

const users = []; // array para armazenar os usuários

app.use(express.json()); // garante que o Express entenda o formato JSON

// rota POST para criar os usuários
app.post("/users", (request, response) => {
  users.push(request.body); // adiciona os dados enviados pelo cliente no array "users"
  response.status(201).send(); // envia uma resposta para o cliente: Sucesso, novo usuário criado!
});

// rota GET para listar os usuários
app.get("/users", (request, response) => {
  response.status(200).json(users); // Sucesso, tudo ok!
});

// iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});

/*
  Mongo DB

  username: GrupoA
  password: desafio+A
*/
