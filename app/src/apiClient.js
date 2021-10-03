export const getTasks = () => _get("/api/tasks");

export const addTask = ({ name, fk_recipe_id }) => {
  console.log({ name, fk_recipe_id });
  return _post("/api/tasks", { name, fk_recipe_id });
};

export const deleteTask = (id) => _delete(`/api/tasks/${id}`);

export const getIngredients = () => _get("/api/ingredients");

export const addIngredient = ({
  ingredient_name,
  ingredient_quantity,
  unit_measure,
  fk_recipe_id,
}) =>
  _post("/api/ingredients", {
    ingredient_name,
    ingredient_quantity,
    unit_measure,
    fk_recipe_id,
  });

export const deleteIngredient = (id) => _delete(`/api/ingredients/${id}`);

export const getRecipeDetails = () => _get("/api/recipedetails");

export const getRecipe = (id) => _get(`/api/recipedetails/${id}`);

export const addRecipeDetail = ({
  recipe_title,
  recipe_image,
  recipe_video,
  recipe_description,
}) => {
  console.log({ recipe_title, recipe_image, recipe_video, recipe_description });
  return _post("/api/recipedetails", {
    recipe_title,
    recipe_image,
    recipe_video,
    recipe_description,
  });
};
// export const deleteRecipeDetail = (id) => _delete(`/api/recipedetails/${id}`);

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  let result;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    result = await response.json();
  } catch (err) {
    console.log(err);
  }

  return result;
};
const _delete = (url) => fetch(url, { method: "DELETE" });
