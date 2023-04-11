import React from "react";
// import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  // const [cars, setCars] = useState([]);

  return (
    <div className="home-container-home">
        <section className="welcome-section-container">
            <div className="welcome-container">
                <h1>Welcome {user.username}!</h1>
            </div>
        </section>
        <section className="hero-section">
            <div className="home-recipe-option">
                <div className="option">
                    <h1>
                        <a href="http://localhost:3000/search/">Search All Recipes</a>
                    </h1>
                 </div>
                <div className="option">
                    <h1>
                        <a href="http://localhost:3000/myrecipes/">My Recipes</a>
                    </h1>
                </div>
            </div>
            <div className="home-pinch">
                <div className="pinch">
                    <h1>
                        Definition of Pinch in Cajun Cooking
                    </h1>
                    <p>
                        Cajun Pinch<small class="text-muted">...[key-juhn pinch]</small>
                    </p>
                    <p><i>noun </i>
                        <p>unit of measure in cajun cooking</p>
                    </p>
                    <p>
                        - season till you hear the voices of your ancestors whisper{" "}
                        <i>
                            <small class="text-muted">"Dat's enough cher(sha)"</small>
                        </i>
                    </p>
                </div>
            </div>
        </section>
    </div>
  );
};

export default HomePage;

{
  /* {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))} */
}

// useEffect(() => {
//   const fetchCars = async () => {
//     try {
//       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       setCars(response.data);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };
//   fetchCars();
// }, [token]);
