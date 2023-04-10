import axios from "axios";
// import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { useNavigate } from "react-router-dom";
import "./RecipeDisplay.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//Component to fetch a single recipe and display it.
const RecipeDisplay = (props) => {
  // const {recipeId} = useParams();
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const [user, token] = useAuth();

  const navigate = useNavigate();

  //Async function to get a single recipe by Id and also get the ingredient objects(name, quantity and units)
  async function getRecipeById() {
    try {
      let recipeResponse = await axios.get(
        `http://127.0.0.1:8000/api/recipes/${props.recipeId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      let ingredientsResponse = await axios.get(
        `http://127.0.0.1:8000/api/recipes/all_ingredients/${props.recipeId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setRecipe(recipeResponse.data);
      setIngredients(ingredientsResponse.data);
      console.log(recipeResponse.data);
      console.log(ingredientsResponse.data);
    } catch (error) {
      console.error(error);
    }
  }
  //useEffect hook to fetch recipe and ingredients data when the component mounts or token changes
  useEffect(() => {
    getRecipeById();
  }, [token, props.recipeId]);

  //State to store the number of servings
  const [servings, setServings] = useState(recipe?.serving_size || 1);
  //useEffect hook to update the Change Servings input to match the recipe servings
  useEffect(() => {
    if (recipe) {
      setServings(recipe.serving_size);
    }
  }, [recipe]);

  //Function to update the ingredient quantity for each ingredient.
  const updateQuantities = (ingredients, newServings) => {
    const updatedIngredients = ingredients.map((ingredient) => {
      return {
        ...ingredient,
        quantity: (ingredient.quantity / servings) * newServings,
      };
    });
    return updatedIngredients;
  };
  //   //Function to handle change of the from the original ingredient servings and setServings.
  //   const handleServingsChange = (event) => {
  //     try{
  //         const newServings = parseInt(event.target.value || 1);
  //         setServings(newServings);
  //         setIngredients(updateQuantities(ingredients, newServings));
  //     }catch(er){
  //         console.log(er)
  //     }
  //   };

  // Add a new state for the previous valid servings value
  const [prevValidServings, setPrevValidServings] = useState(
    recipe?.serving_size || 1
  );
  // Add a new state for the input value
  const [inputValue, setInputValue] = useState();

  const handleServingsChange = (event) => {
    const value = event.target.value;
    setInputValue(value); // Update the inputValue state

    let newServings;
    try {
      newServings = parseInt(value);
      if (isNaN(newServings) || newServings <= 0) {
        newServings = prevValidServings;
      } else {
        setPrevValidServings(newServings);
      }
      setServings(newServings);
      setIngredients(updateQuantities(ingredients, newServings));
    } catch (er) {
      console.log(er);
    }
  };

//Function to print recipe.
// const printRecipe = async () => {
//   try {
//     const element = document.getElementById('element-to-print');
//     console.log(element)
//     const canvas = await html2canvas(element);
//     const pdf = new jsPDF('p', 'mm', [canvas.width, canvas.height]);
//     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
//     pdf.save('recipe.pdf');
//   } catch (error) {
//     console.log(error);
//   }
// };

// //click event listener to the button
// const printBtn = document.querySelector('#print-btn');
// printBtn.addEventListener('click', printRecipe);
 
 

  //Navigate routed to EditRecipePage using edit button in form
  const navToEditRecipe = (recipeObject) => {
    navigate(`/editRecipe`, {
      state: { recipe: recipeObject, ingedients: ingredients },
    });
  };

  //Delete a recipe by Id.
  async function deleteRecipe(recipe) {
    try {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?")
        if (confirmed) {
            let response = await axios.delete(
            `http://127.0.0.1:8000/api/recipes/${props.recipeId}/`,
            {
            headers: { Authorization: "Bearer " + token },
            }
            );
            alert("Recipe is Deleted!");
            console.log(response.status);
            if (response.status === 204) {
            navigate(`/myrecipes`);
            } 
        }
       
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="recipe-container">

      <h1 className="recipe-header">{recipe?.title}</h1>
      <img className="recipe-image" src={`http://127.0.0.1:8000${recipe?.image}/`} alt="" />
      
      <div className="recipe-details">
        <span className="recipe-detail">Chef: {recipe?.home_chef}</span>
        <span className="recipe-detail">Category: {recipe?.category.category}</span>
        <span className="recipe-detail">Servings: {recipe?.serving_size}</span>
      </div>
      <p className="recipe-description">Description: {recipe?.description}</p>
      
      <div className="recipe-servings">
        <h2>Change Servings</h2>
        <label htmlFor="servings" className="servings-label">
        Servings:
      </label>
        <input
          id="servings"
          name="servings"
          type="number"
          value={inputValue}
          className="servings-input"
          min="1"
          onChange={handleServingsChange}
        />
      </div>

      {servings ? (
        <div className="recipe-ingredients">
          <h2>Ingredients:</h2>
          <ul className="ingredients-list" style={{ display: "flex", flexDirection: "column" }}>
            {ingredients?.map((item) => (
              <li key={item.name}>
                {item.quantity} {item.units} of <span className="ingredient-name">{item.ingredient_name}</span>
                <br />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="recipe-creator">
        <h3>
          Recipe added by:{" "}
          {recipe?.user.username.charAt(0).toUpperCase() +
          recipe?.user.username.slice(1)}
        </h3>
        <div>
          <button className="button" id="print-btn">Print Recipe</button>
        </div>
      </div>
      <h3>Instructions: </h3>
      <h5 className="recipe-instructions">{recipe?.instructions}</h5>
 
      {user?.id === recipe?.user.id ? (
        <div className="conditional-btns">
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteRecipe(recipe)}
          >
            Delete Recipe
          </button>
          <button className="button" onClick={() => navToEditRecipe(recipe)}>Edit Recipe</button>
        </div>
      ) : null}
      <div className="comment-container">
        <div className="comment-form">
          <CommentForm recipe_id={recipe?.id} />
        </div>
        <div className="comments-section">
          <CommentList recipe_id={recipe?.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
{
  /* <ul>{recipe?.ingredients.map(item => <li key={item.name}>{item.name}</li>)}</ul> */
}
// const ingredients = [{}];

// Need the recipe ID from the RecipeList item that is clicked on
// Send the ID as a param on the URL
// Grab the ID with useParams here and use in the AXIOS URL request

//Using props "recipeId" brought in and defined on RecipePage.
// async function getRecipeById() {
//     let response = await axios.get(`http://127.0.0.1:8000/api/recipes/${props.recipeId}/`, {
//         headers: {
//             Authorization: "Bearer " + token,
//         },
//     });
//     setRecipe(response.data)
//     console.log(response.data)
// }

{
  /* <button onClick={ () => getRecipeById()}>Get Recipe by ID</button> */
}
