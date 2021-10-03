import express from "express";

import * as db from "./db.mjs";

const ingredientRouter = express.Router();

ingredientRouter.use(express.json());

ingredientRouter.get("/", async (request, response) => {
  const ingredients = await db.getIngredients();
  response.json(ingredients);
});

ingredientRouter.post("/", async (request, response) => {
  console.log(request.body);
  const ingredient = await db.addIngredient(request.body);
  response.status(201).json(ingredient);
});

export default ingredientRouter;
