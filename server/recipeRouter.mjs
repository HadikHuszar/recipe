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

  return Promise.all([
    db.getRecipe(recipeId),
    db.getIngredientsForRecipe(recipeId),
    db.getTasksForRecipe(recipeId),
  ]).then((values) => {
    const [recipevalue, ingredientsvalue, tasksvalue] = values;
    return response.json({
      recipe: recipevalue,
      ingredients: ingredientsvalue,
      tasks: tasksvalue,
    });
  });
});

recipeRouter.post("/", async (request, response) => {
  console.error("request body", request.body);
  const recipe = await db.addRecipeDetail(request.body);
  response.status(201).json(recipe);
});

export default recipeRouter;
