import * as React from "react";

import * as apiClient from "./apiClient";

import "./App.css";

const Ingredients = () => {
  const [ingredients, setIngredients] = React.useState([]);

  const loadIngredients = async () =>
    setIngredients(await apiClient.getIngredients());

  const addIngredient = (ingredient) =>
    apiClient.addIngredient(ingredient).then(loadIngredients);

  React.useEffect(() => {
    loadIngredients();
  }, []);

  return (
    <>
      <span id="ingredient-list-title">Ingredient List</span>
      <span id="ingredient-list">
        <IngredientList ingredients={ingredients} />
      </span>
      <span id="add-ingredient">
        <AddIngredient addIngredient={addIngredient} />
      </span>
    </>
  );
};

const IngredientList = ({ ingredients }) => (
  <ul>
    {ingredients.map(
      ({ id, ingredient_name, ingredient_quantity, unit_measure }) => (
        <li key={id}>
          <span id="ingredient_name">{ingredient_name}</span>
          <span id="ingredient_quantity">{ingredient_quantity}</span>
          <span id="unit_measure">{unit_measure}</span>
        </li>
      ),
    )}
  </ul>
);

const AddIngredient = ({ addIngredient, loadIngredients }) => {
  const [ingredient_name, setIngredientName] = React.useState("");
  const [ingredient_quantity, setIngredientQuantity] = React.useState("");
  const [unit_measure, setUnitMeasure] = React.useState("");

  const canAdd = ingredient_name && ingredient_quantity && unit_measure;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      console.log({ ingredient_name, ingredient_quantity, unit_measure });
      await addIngredient({
        ingredient_name,
        ingredient_quantity,
        unit_measure,
      });
      //   await loadIngredients();
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
          placeholder="Ingredient Name"
          onChange={(e) => setIngredientName(e.currentTarget.value)}
          value={ingredient_name}
        />
      </label>
      <label>
        <input
          placeholder="Quantity"
          onChange={(e) => setIngredientQuantity(e.currentTarget.value)}
          value={ingredient_quantity}
        />
      </label>
      <label>
        <input
          placeholder="Unit Measure"
          onChange={(e) => setUnitMeasure(e.currentTarget.value)}
          value={unit_measure}
        />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Ingredients;
