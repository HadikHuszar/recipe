import express from "express";

import * as db from "./db.mjs";

const recipeRouter = express.Router();

recipeRouter.use(express.json());

recipeRouter.get("/", async (request, response) => {
  const recipe = await db.getRecipeDetails();
  response.json(recipe);
});

recipeRouter.get("/:id", async (request, response) => {
  const recipeId = request.params.id;
  response.json({
    recipe: await db.getRecipe(recipeId),
    ingredients: await db.getIngredientsForRecipe(recipeId),
    tasks: await db.getTasksForRecipe(recipeId),
  });
});

recipeRouter.post("/", async (request, response) => {
  console.error("request body", request.body);
  const recipe = await db.addRecipeDetail(request.body);
  response.status(201).json(recipe);
});

export default recipeRouter;
