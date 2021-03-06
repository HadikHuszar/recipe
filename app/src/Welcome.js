import * as React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import * as apiClient from "./apiClient";
import imageSrc from "./assets/EHB_Profile_Circular.png";
import imageSrc2 from "./assets/EHB_Signature.png";

import "./App.css";

const Welcome = () => {
  const [recipe, setRecipes] = React.useState([]);

  const loadRecipeDetails = async () =>
    setRecipes(await apiClient.getRecipeDetails());
  console.log(recipe);

  React.useEffect(() => {
    loadRecipeDetails();
  }, []);

  return (
    <>
      <span id="main-block">
        <Carousel autoPlay infiniteLoop interval="6000">
          {recipe.map(({ id, recipe_image, recipe_title }) => (
            <div key={id}>
              <Link to={`/recipes/${id}`}>
                <img class="img-fluid" src={recipe_image} />
                <p className="legend">{recipe_title}</p>
              </Link>
            </div>
          ))}
        </Carousel>
      </span>

      {/* {recipe.map(({ id, recipe_image, recipe_title }) => (
        <span key={id}>
          <span id="main-block">
            <Carousel autoPlay>
              <div>
                <Link to={`/recipes/${id}`}>
                  <img class="img-fluid" src={recipe_image} />
                  <p className="legend">{recipe_title}</p>
                </Link>
              </div>
            </Carousel>
          </span>
        </span>
      ))} */}

      <span id="main-text">
        <span id="main-text-title">Fall Is Upon Us...</span>
        <br></br>
        Well ... it actually happened. <br></br>The end of summer has passed us,
        and now we are bracing for shorter days, longer nights, cooler
        temperatures, colorful leaves, sweatshirts, and football. Not only is
        the weather going to change, but also the way we&rsquo;re cooking is
        too, from using fresh fall produce, like squash, sweet potatoes, and
        apples, to creating warming comfort. That is food, perfected, for the
        fall!
      </span>

      <span id="why-201-sidebar">
        <span id="why-201-sidebar-title">Why</span>
        <span id="why-201-sidebar-subtitle"> 201&deg;?</span>
        <br></br>
        <span id="why-201-sidebar-text">
          Because 201&deg; is the perfect simmering temperature. <br></br>Why is
          that important? &ldquo;Simmering&rdquo; relies on using low heat to
          allow flavors to infuse over time and provide deeper results more than
          any other method. That is why<br></br>
          <b> 201&deg; is the key to food, perfected.</b>
        </span>
        <br></br>
        <span id="nice-to-meet-you-sidebar-text">
          <span id="nice-to-meet-you-title">Nice to Meet You</span>
          <br></br>
          Hello there, and welcome to my little corner of the Internet,
          <span id="two-degrees"> 201&deg;</span>. Even though I no longer cook
          professionally, I am still passionate about food. I believe in keeping
          things simple, where high-quality ingredients are not interfered with,
          but are rather allowed to bloom instead. I scour the world{" "}
          <i>(both in person and the Web)</i> for food, perfected, to share with
          you. <br></br>
          Happy Cooking! <br></br>
          <span id="signature">
            <img src={imageSrc2} width="130" height="100" />
          </span>
          <span id="profile-photo">
            <img src={imageSrc} width="280" height="280" />
          </span>
        </span>
      </span>

      <span id="main-title">My Fall Favorites</span>
    </>
  );
};

export default Welcome;
