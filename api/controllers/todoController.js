import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTodos = async (req, res) => {
  try {
    const todos = await prisma.todos.findMany();
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};

export const createNewTodo = async (req, res) => {
  try {
    const { title, description} = req.body;
    // Validate input
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // Create new todo
    const newTodo = await prisma.todos.create({
      data: {
        title,
        description,
        
      },
    });

    res.status(201).json({
      message: "Successfully created a new Todo",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todoupdate = await prisma.todos.update({
      where: {
        tododId: +id,
      },
      data: {
        title,
        description,
      },
    });
    res.status(200).json({
      message: "Todo updated successfully : ${id}",
    });
  } catch (err) {
    res.status(404).json({
      message: "Todo not found",
      error: err.message,
    });
  }
};
// delete
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const {title, description } = req.body;
    const deleteTodo = await prisma.todos.delete({
      where: {
        tododId: +id,
      },
     
    });
    res.status(200).json({
      message: "Todo deleted successfully : ${id}",
    });
  } catch (err) {
    res.status(404).json({
      message: "Todo not found",
      error: err.message,
    });
  }
};
//filters 
export const filterTodo = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description } = req.body;
    const todos = await prisma.todos.findFirst({
      where: {
        tododId:+id,
      },
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};