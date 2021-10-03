import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import RecipePage from "./Recipe";
import RecipeToolBox from "./RecipeToolBox";
import Welcome from "./Welcome";

const App = () => (
  <>
    <nav>
      <Link to="/">Home</Link> | <Link to="welcome">Welcome</Link> |
      <Link to="dashboard">Recipe Dashboard</Link> |
      <Link to="/recipes">Recipe Page</Link>
      <span id="page-title">201&deg;</span>
      <span id="page-subtitle">Food, &nbsp;&nbsp;Perfected</span>
      <span id="page-biline">In Search of Quintessential Food Hacks</span>
    </nav>
    <main>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div>
              <RecipeToolBox />
            </div>
          }
        />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="welcome" element={<Welcome />} />
      </Routes>
    </main>
  </>
);

// const Welcome = () => (
//   <>
//     <Welcome />
//   </>
// );

export default App;
