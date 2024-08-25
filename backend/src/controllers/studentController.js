import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStudent = async (request, response) => {
  try {
    const { ra, cpf, email, name } = request.body;

    if (!ra || !cpf || !email || !name) {
      return response.status(400).json("Todos os campos são obrigatórios.");
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [{ ra: ra }, { cpf: cpf }, { email: email }],
      },
    });

    if (existingStudent) {
      const field =
        existingStudent.ra === ra
          ? "RA"
          : existingStudent.cpf === cpf
          ? "CPF"
          : "E-mail";

      return response
        .status(400)
        .json(`Este ${field} já está cadastrado no sistema.`);
    }
    const studentCreated = await prisma.student.create({
      data: { ra: ra, cpf: cpf, email: email, name: name },
    });
    return response.status(201).json(studentCreated);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const getStudents = async (request, response) => {
  try {
    const students = await prisma.student.findMany();
    return response.status(200).json(students);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const getStudent = async (request, response) => {
  try {
    const { ra } = request.params;
    const students = await prisma.student.findUnique({
      where: {
        ra: ra,
      },
    });
    return response.status(200).json(students);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const updateStudent = async (request, response) => {
  try {
    const { email, name } = request.body;
    const { ra } = request.params;

    if (!email || !name) {
      return response.status(400).json("Todos os campos são obrigatórios.");
    }

    const studentSavedInDataBase = await prisma.student.findFirst({
      where: {
        ra: ra,
      },
    });

    if (!studentSavedInDataBase) {
      return response.status(404).json("Estudante não encontrado no sistema.");
    }

    const previousEmail = studentSavedInDataBase.email;

    const newEmail = email;

    const emailChanged = previousEmail != newEmail;
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
        ra: ra,
      },
      data: { email: email, name: name },
    });
    return response.status(201).json(studentUpdated);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const deleteStudent = async (request, response) => {
  try {
    const { ra } = request.params;

    const studentExists = await prisma.student.findFirst({ where: { ra: ra } });

    if (!studentExists) {
      return response.status(404).json("Estudante não encontrado.");
    }

    await prisma.student.delete({
      where: {
        ra: ra,
      },
    });

    return response.status(200).json("Estudante deletado com sucesso!");
  } catch (error) {
    return response.status(500).json(error);
  }
};
