import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express(); // criando uma instância do Express

const users = []; // array para armazenar os usuários

app.use(express.json()); // garante que o Express entenda o formato JSON

// rota POST para criar os usuários
app.post("/users", async (request, response) => {
  await prisma.user.create({
    data: {
      ra: request.body.ra,
      cpf: request.body.cpf,
      email: request.body.email,
      name: request.body.name,
    },
  }); // adiciona os dados enviados pelo cliente no array "users"
  response.status(201).json(request.body); // envia uma resposta para o cliente: Sucesso, novo usuário criado!
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
