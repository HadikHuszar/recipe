import * as React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import imageSrc from "./assets/EHB_Profile_Circular.png";
import imageSrc2 from "./assets/EHB_Signature.png";

import "./App.css";

const Welcome = () => {
  ///api call for all recipes
  ///map pass it ot eh carousel
  return (
    <>
      <span id="main-block">
        <Carousel autoPlay>
          <Link to={``}>
            <img
              class="img-fluid"
              src="https://lh3.googleusercontent.com/nf0Ub8NE8Sjy4BgLT8mEuWvqsSEf8Vc8rOZ00lR8cLZIqi5lGs_ZI3tiy4utzwK9en2dqbtHmABrHLAmzZpmaw3-UTCo1LqZLiJlJ0Ri9VFfqdbYs8Xe_ArwRpQCv6M06oDPMuZP=w2400"
            />
            <p className="legend">Zucchini Spaghetti with Avocado Sauce</p>
          </Link>
          <div>
            <img
              class="img-fluid"
              src="https://lh3.googleusercontent.com/BHH6U-5pVqumEZfrfWOT1CZJZFcGUINo1fwWsjovg3d3ossA3D7GpVVU1Q-q4LA8ZWBKc5P4fI9f82bTjoTMl9LkvpQR9GFjKN4o7LXNnWOFCLtkmjQbBhI4OvTFvIQ1q2b2y5i1=w2400"
            />
            <p className="legend">Spaghetti with Crispy Zucchini</p>
          </div>
          <div>
            <img
              class="img-fluid"
              src="https://lh3.googleusercontent.com/zlAVgHeNX2rgpsM-H1RGlMxHitr1XPxkK_GWT_p8anl-lq8oBWKQpSMqj8whI8UVV2jwt8J-W20GBx778KGbVPXHMg7EuRdAEZee45wSeiZW497I5LXVYyq_Fp7-eUfkhUcgTfZo=w2400"
            />
            <p className="legend">Lifechanging Beef Stew</p>
          </div>
          <div>
            <img
              class="img-fluid"
              src="https://lh3.googleusercontent.com/t7E0aKao-h-uksGgj-byu35X38wv2kw_z96q_dw-BycTIWUV2M2ofLOKRiMTy9jb8rXRRy8sieAGmQTp7ltQnnl6Wgl7PBXCcyP0QDukDJ_dS3Vq6GjQW-QLrzobuKP52TjTPfW5=w2400"
            />
            <p className="legend">Smokey Red Lentil</p>
          </div>
        </Carousel>
      </span>

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
