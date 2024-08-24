import express, { response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/students", async (request, response) => {
  try {
    const student = {
      ra: request.body.ra,
      cpf: request.body.cpf,
      email: request.body.email,
      name: request.body.name,
    };

    if (!student.ra || !student.cpf || !student.email || !student.name) {
      return response.status(400).json("Todos os campos são obrigatórios.");
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { ra: student.ra },
          { cpf: student.cpf },
          { email: student.email },
        ],
      },
    });

    if (existingStudent) {
      const field =
        existingStudent.ra === student.ra
          ? "RA"
          : existingStudent.cpf === student.cpf
          ? "CPF"
          : "E-mail";

      return response
        .status(400)
        .json(`Este ${field} já está cadastrado no sistema.`);
    }
    const studentCreated = await prisma.student.create({
      data: student,
    });
    return response.status(201).json(studentCreated);
  } catch (error) {
    return response.status(500).json(error);
  }
});

app.get("/students", async (request, response) => {
  try {
    const students = await prisma.student.findMany();
    return response.status(200).json(students);
  } catch (error) {
    return response.status(500).json(error);
  }
});

app.get("/students/:ra", async (request, response) => {
  try {
    const ra = request.params.ra;
    const students = await prisma.student.findUnique({
      where: {
        ra: ra,
      },
    });
    return response.status(200).json(students);
  } catch (error) {
    return response.status(500).json(error);
  }
});

app.put("/students/:ra", async (request, response) => {
  try {
    const data = {
      email: request.body.email,
      name: request.body.name,
    };

    if (!data.email || !data.name) {
      return response.status(400).json("Todos os campos são obrigatórios.");
    }

    const studentSavedInDataBase = await prisma.student.findFirst({
      where: {
        ra: request.params.ra,
      },
    });

    if (!studentSavedInDataBase) {
      return response.status(404).json("Estudante não encontrado no sistema.");
    }

    const previousEmail = studentSavedInDataBase.email;

    const newEmail = data.email;

    const emailChanged = previousEmail != newEmail;

    console.log("Chegou aqui");
    if (emailChanged) {
      const alreadyExistsStudentWithEmail = await prisma.student.findFirst({
        where: {
          email: newEmail,
        },
      });

      if (alreadyExistsStudentWithEmail) {
        return response
          .status(400)
          .json("Já existe um estudante com esse e-mail.");
      }
    }
    const studentUpdated = await prisma.student.update({
      where: {
        ra: request.params.ra,
      },
      data: data,
    });
    return response.status(201).json(studentUpdated);
  } catch (error) {
    return response.status(500).json(error);
  }
});

app.delete("/students/:ra", async (request, response) => {
  await prisma.student.delete({
    where: {
      ra: request.params.ra,
    },
  });
  return response
    .status(201)
    .json({ message: "Estudante deletado com sucesso!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
