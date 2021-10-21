import * as React from "react";

import { useParams } from "react-router";

import * as apiClient from "./apiClient";

import "./App.css";

const RecipePage = () => {
  const params = useParams();

  const [ingredients, setIngredients] = React.useState([]);

  const [tasks, setTasks] = React.useState([]);

  const [recipe, setRecipe] = React.useState();

  const [currentRecipeId, setCurrentRecipeId] = React.useState();

  // const loadTasks = async () => setTasks(await apiClient.getTasks());

  const loadRecipeDetails = async () => {
    const apiRecipe = await apiClient.getRecipe(currentRecipeId);

    if (apiRecipe.recipe) {
      setRecipe(apiRecipe.recipe);
      setTasks(apiRecipe.tasks);
      setIngredients(apiRecipe.ingredients);
    }
  };

  React.useEffect(() => {
    setCurrentRecipeId(params.id);
  }, []);

  React.useEffect(() => {
    if (!currentRecipeId) {
      return;
    } else {
      loadRecipeDetails();
    }
  }, [currentRecipeId]);

  if (!recipe) {
    return <h1>No recipe here!</h1>;
  }

  return (
    <>
      <span>
        <Recipes recipe={recipe} />
        {recipe ? <Recipes recipe={recipe} /> : null}
      </span>
      <span id="sidebar_block_mockup">
        <span id="ingredient_list_title_mockup">Ingredients List</span>
        <span id="ingredient_list_mockup">
          <IngredientList ingredients={ingredients} />
        </span>
        <br></br>
        <span id="task_list_title_mockup">Directions</span>
        <span id="task_list_mockup">
          <TaskList tasks={tasks} />
        </span>
      </span>
    </>
  );
};

export default RecipePage;

/////////////////// INDIVIDUAL COMPONENTS ARE BELOW ////////////////////

/////////////////// Ingredients ////////////////////

const IngredientList = ({ ingredients }) => (
  <ul>
    {ingredients.map(
      ({ id, ingredient_name, ingredient_quantity, unit_measure }) => (
        <li key={id}>
          <span id="ingredient_quantity_mockup">{ingredient_quantity}</span>
          <span id="unit_measure_mockup">{unit_measure}</span>
          <span id="ingredient_name_mockup">{ingredient_name}</span>
        </li>
      ),
    )}
  </ul>
);

/////////////////// Tasks ////////////////////

const TaskList = ({ tasks, deleteTask }) => (
  <ol>
    {tasks.map(({ id, name }) => (
      <li key={id}>
        <span
          role="button"
          tabIndex="0"
          onKeyDown={() => deleteTask(id)}
          id="recipe_name"
          onClick={() => deleteTask(id)}
        >
          {name}
        </span>
      </li>
    ))}
  </ol>
);

/////////////////// Recipes ////////////////////

const Recipes = ({
  recipe: { id, recipe_title, recipe_image, recipe_video, recipe_description },
}) => (
  <span key={id}>
    <span id="recipe_title_mockup">{recipe_title}</span>

    <span id="recipe_image_mockup">
      <img src={recipe_image} width="450" height="450" />
    </span>

    <span id="recipe_image_title_mockup">Finished Dish</span>

    <div id="recipe_video_mockup">
      <iframe
        width="560"
        height="315"
        src={recipe_video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    <span id="recipe_video_title_mockup">Step-by-Step Directions</span>

    <span id="recipe_description_mockup">{recipe_description}</span>
  </span>
);
