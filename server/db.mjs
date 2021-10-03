import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = () => db.any("SELECT * FROM tasks");

export const getTasksForRecipe = (recipeId) =>
  db.any("SELECT * FROM tasks WHERE fk_recipe_id = ${recipeId}", { recipeId });

export const addTask = ({ name, fk_recipe_id }) =>
  db.one(
    "INSERT INTO tasks(name, fk_recipe_id) VALUES(${name},${fk_recipe_id}) RETURNING *",
    { name, fk_recipe_id },
  );

export const deleteTask = (id) =>
  db.none("DELETE FROM tasks WHERE id = ${id}", { id });

export const getIngredients = () => db.any("SELECT * FROM ingredients");

export const getIngredientsForRecipe = (recipeId) =>
  db.any("SELECT * FROM ingredients WHERE fk_recipe_id = ${recipeId}", {
    recipeId,
  });

export const addIngredient = ({
  ingredient_name,
  ingredient_quantity,
  unit_measure,
  fk_recipe_id,
}) =>
  db.any(
    "INSERT INTO ingredients(ingredient_name, ingredient_quantity, unit_measure, fk_recipe_id) VALUES(${ingredient_name}, ${ingredient_quantity}, ${unit_measure}, ${fk_recipe_id}) RETURNING *",
    { ingredient_name, ingredient_quantity, unit_measure, fk_recipe_id },
  );

export const getRecipeDetails = () => db.any("SELECT * FROM recipes");

export const getRecipe = (id) =>
  db.oneOrNone("SELECT * FROM recipes WHERE id = ${id}", { id });

export const addRecipeDetail = ({
  recipe_title,
  recipe_image,
  recipe_video,
  recipe_description,
}) =>
  db.any(
    "INSERT INTO recipes(recipe_title, recipe_image, recipe_video, recipe_description) VALUES(${recipe_title}, ${recipe_image}, ${recipe_video}, ${recipe_description}) RETURNING *",
    { recipe_title, recipe_image, recipe_video, recipe_description },
  );

////////////////////////////// RUDIMENTARY FUNCTION ///////////////////////////

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
