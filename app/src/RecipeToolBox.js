import * as React from "react";

import { useNavigate } from "react-router-dom";

import * as apiClient from "./apiClient";

import "./App.css";

const RecipeToolBox = () => {
  const [ingredients, setIngredients] = React.useState([]);

  const [tasks, setTasks] = React.useState([]);

  const [recipe, setRecipe] = React.useState({});

  const navigate = useNavigate();

  const loadTasks = async () => setTasks(await apiClient.getTasks());

  // const addTask = (task) =>
  //   apiClient
  //     .addTask({ name: task, fk_recipe_id: currentRecipeId })
  //     .then(loadTasks);

  const deleteTask = (id) => apiClient.deleteTask(id).then(loadTasks);

  const loadIngredients = async () =>
    setIngredients(await apiClient.getIngredients());

  // const addIngredient = (ingredient) =>
  //   apiClient
  //     .addIngredient({ ...ingredient, fk_recipe_id: currentRecipeId })
  //     .then(loadIngredients);

  const addRecipeDetail = (recipe) =>
    apiClient.addRecipeDetail(recipe).then(loadRecipeDetails);

  //   const deleteRecipeDetail = (id) =>
  //     apiClient.deleteRecipeDetail(id).then(loadRecipeDetails);

  const loadRecipeDetails = async () =>
    setRecipe(await apiClient.getRecipeDetails());

  // React.useEffect(() => {
  // loadRecipeDetails();
  // loadIngredients();
  // loadTasks();
  // }, []);

  console.log(ingredients);
  console.log(tasks);

  const submitRecipeToDatabase = async () => {
    const apiRecipe = await apiClient.addRecipeDetail(recipe);
    const currentRecipeId = apiRecipe[0].id;

    // is this all done before the function is finished?
    ingredients.map(async (ingredient) => {
      await apiClient.addIngredient({
        ...ingredient,
        fk_recipe_id: currentRecipeId,
      });
    });

    tasks.map(async (task) => {
      await apiClient.addTask({ name: task, fk_recipe_id: currentRecipeId });
    });
    navigate(`/recipes/${currentRecipeId}`);
  };

  return (
    <>
      <section>
        {/* <span id="recipe-toolbox-title">Recipe ToolBox</span> */}

        <span id="add-recipe">
          <AddRecipeDetail
            addRecipeDetail={setRecipe}
            // loadRecipeDetails={loadRecipeDetails}
            // setCurrentRecipeId={setCurrentRecipeId}
          />
        </span>

        <span id="add-ingredient">
          <AddIngredient
            ingredients={ingredients}
            addIngredient={setIngredients}
            loadIngredients={loadIngredients}
          />
        </span>

        <span id="add-task">
          <AddTask addTask={setTasks} loadTasks={loadTasks} />
        </span>

        <span id="submit-button">
          <button onClick={(e) => submitRecipeToDatabase()}>
            Submit Recipe
          </button>
        </span>
      </section>

      <span id="task-list-title">Directions</span>
      <span id="task-list">
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </span>

      <span id="ingredient-list-title">Ingredients List</span>
      <span id="ingredient-list">
        <IngredientList ingredients={ingredients} />
      </span>

      <span id="dashboard-sidebar-title">You Are Working On:</span>
      <span id="recipe-details">
        <Recipes recipe={recipe} />
      </span>
    </>
  );
};

export default RecipeToolBox;

/////////////////// INDIVIDUAL COMPONENTS ARE BELOW ////////////////////

/////////////////// Ingredients ////////////////////

const IngredientList = ({ ingredients }) => {
  console.log("ingredient list", ingredients);
  return (
    <ul>
      {ingredients.map(
        ({ id, ingredient_name, ingredient_quantity, unit_measure }) => (
          <li key={id}>
            <span id="ingredient_quantity">{ingredient_quantity}</span>
            <span id="unit_measure">{unit_measure}</span>
            <span id="ingredient_name">{ingredient_name}</span>
          </li>
        ),
      )}
    </ul>
  );
};

const AddIngredient = ({ addIngredient }) => {
  const [ingredient_name, setIngredientName] = React.useState("");
  const [ingredient_quantity, setIngredientQuantity] = React.useState("");
  const [unit_measure, setUnitMeasure] = React.useState("");

  const canAdd = ingredient_name && ingredient_quantity && unit_measure;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      addIngredient((ingredients) => [
        ...ingredients,
        {
          ingredient_name,
          ingredient_quantity,
          unit_measure,
        },
      ]);
      setIngredientName("");
      setIngredientQuantity("");
      setUnitMeasure("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Ingredients List:<br></br>
        <input
          id="input_ingredient_name"
          placeholder="Ingredient Name"
          onChange={(e) => setIngredientName(e.currentTarget.value)}
          value={ingredient_name}
        />
      </label>
      <br></br>
      <label>
        <input
          id="input_ingredient_quantity"
          placeholder="Quantity"
          onChange={(e) => setIngredientQuantity(e.currentTarget.value)}
          value={ingredient_quantity}
        />
      </label>
      <br></br>
      <label>
        <input
          id="input_ingredient_unitmeasure"
          placeholder="Unit Measure"
          onChange={(e) => setUnitMeasure(e.currentTarget.value)}
          value={unit_measure}
        />
      </label>
      <button id="ingredients_button" disabled={!canAdd}>
        Add
      </button>
    </form>
  );
};

/////////////////// Tasks ////////////////////

const TaskList = ({ tasks, deleteTask }) => (
  <ol>
    {tasks.map((name) => (
      <li key={name}>
        <div>
          <span
            role="button"
            tabIndex="0"
            // onKeyDown={() => deleteTask(id)}
            id="tasklist_item"
            // onClick={() => deleteTask(id)}
          >
            {name}
          </span>
        </div>
      </li>
    ))}
  </ol>
);

const AddTask = ({ addTask }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addTask((tasks) => [...tasks, task]);
      setTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Directions:
        <input
          id="input_directions"
          placeholder="Enter Task"
          onChange={(e) => setTask(e.currentTarget.value)}
          value={task}
        />
      </label>
      <button id="directions_button" disabled={!canAdd}>
        Add
      </button>
    </form>
  );
};

/////////////////// Recipes ////////////////////

const Recipes = ({
  recipe: { recipe_title, recipe_image, recipe_video, recipe_description },
}) => (
  <span id="recipe-details-block">
    <span>
      <ul>
        <li>
          Recipe Title:
          <div>
            <span id="recipe_title">&#8220;{recipe_title}&#8221;</span>
          </div>
        </li>
        <li>
          Recipe Image:
          <span id="recipe_image">
            <img src={recipe_image} width="185" height="125" />
          </span>
        </li>
        <li>
          Recipe Video:
          <span id="recipe_video">
            {/* <img src={recipe_video} width="100" height="75" /> */}

            <iframe
              width="186"
              height="105"
              src={recipe_video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </span>
        </li>
        <br></br>
        <li>
          Recipe Description:
          <div>
            <span id="recipe_description">{recipe_description}</span>
          </div>
        </li>
      </ul>
    </span>
  </span>
);

const AddRecipeDetail = ({ addRecipeDetail }) => {
  const [recipe_title, setRecipeTitle] = React.useState("");
  const [recipe_image, setRecipeImage] = React.useState("");
  const [recipe_video, setRecipeVideo] = React.useState("");
  const [recipe_description, setRecipeDescription] = React.useState("");

  const canAdd = recipe_title && recipe_image && recipe_description;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      addRecipeDetail({
        recipe_title,
        recipe_image,
        recipe_video,
        recipe_description,
      });

      setRecipeTitle("");
      setRecipeImage("");
      setRecipeVideo("");
      setRecipeDescription("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Recipe Details:<br></br>
        <input
          id="input_recipe_title"
          placeholder="Recipe Title"
          onChange={(e) => setRecipeTitle(e.currentTarget.value)}
          value={recipe_title}
        />
      </label>
      <br></br>
      <label>
        <input
          id="input_recipe_image"
          placeholder="Image"
          onChange={(e) => setRecipeImage(e.currentTarget.value)}
          value={recipe_image}
        />
      </label>
      <br></br>
      <label>
        <input
          id="input_recipe_video"
          placeholder="Video"
          onChange={(e) => setRecipeVideo(e.currentTarget.value)}
          value={recipe_video}
        />
      </label>
      <br></br>
      <label>
        <input
          id="input_recipe_description"
          placeholder="Description"
          onChange={(e) => setRecipeDescription(e.currentTarget.value)}
          value={recipe_description}
        />
      </label>
      <button id="recipe_button" disabled={!canAdd}>
        Add
      </button>
    </form>
  );
};
