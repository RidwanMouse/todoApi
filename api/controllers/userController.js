import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt, { hash } from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

export const createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password:hashedPassword,
      },
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {}
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const userupdate = await prisma.users.update({
      where: {
        userid: +id,
      },
      data: {
        username,
        email,
        password,
      },
    });
    res.status(200).json({
      message: "seccessfull users update ${id}",
    });
  } catch (err) {}
};
