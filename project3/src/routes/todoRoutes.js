import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// GET all todos for logged-in user
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });
  res.json(todos);
});

// CREATE a new todo
router.post("/", async (req, res) => {
  const { task } = req.body;
  const todo = await prisma.todo.create({
    data: {
      task,
      userId: req.userId,
    },
  });

  res.json(todo);
});

// UPDATE a todo
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
    data: {
      completed: !!completed, // boolean value using "!!"
    },
  });

  res.json(updatedTodo);
});

// DETELE a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // const {userId} = req;
  const userId = req.userId;

  await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId,
    },
  });

  res.send({ message: "Todo deleted!" });
});

export default router;
