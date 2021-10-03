import express from "express";

import * as db from "./db.mjs";

const taskRouter = express.Router();

taskRouter.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

taskRouter.use(express.json());
taskRouter.post("/", async (request, response) => {
  console.log(request.body);
  const task = await db.addTask(request.body);
  response.status(201).json(task);
});

taskRouter.delete("/:id", async (request, response) => {
  await db.deleteTask(request.params.id);
  response.status(204).end();
});

export default taskRouter;
