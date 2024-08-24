import express, { response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// criando uma instância do Express
const app = express();

// garante que o Express entenda o formato JSON
app.use(express.json());

// rota POST para criar os estudantes
app.post("/students", async (request, response) => {
  await prisma.student.create({
    data: {
      ra: request.body.ra,
      cpf: request.body.cpf,
      email: request.body.email,
      name: request.body.name,
    },
  });
  response.status(201).json(request.body);
});

// rota GET para listar todos os estudantes
app.get("/students", async (request, response) => {
  const students = await prisma.student.findMany();
  response.status(200).json(students); // Sucesso, tudo ok!
});

// rota GET para listar um estudante
app.get("/students/:ra", async (request, response) => {
  const ra = request.params.ra;
  const students = await prisma.student.findUnique({
    where: {
      ra: ra,
    },
  });
  response.status(200).json(students); // Sucesso, tudo ok!
});

// rota PUT para atualizar os dados dos estudantes
app.put("/students/:ra", async (request, response) => {
  await prisma.student.update({
    where: {
      ra: request.params.ra,
    },
    data: {
      cpf: request.body.cpf,
      email: request.body.email,
      name: request.body.name,
    },
  });
  response.status(201).json(request.body);
});

// rota DELETE para deletar estudantes
app.delete("/students/:ra", async (request, response) => {
  await prisma.student.delete({
    where: {
      ra: request.params.ra,
    },
  });
  response.status(201).json({ message: "Estudante deletado com sucesso!" });
});

// iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
