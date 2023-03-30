import axios from "axios";
// import { useParams } from "react-router-dom";
import React, {useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


//Component to fetch a single recipe and display it. 
const RecipeDisplay = (props) => {
    // const {recipeId} = useParams();
    const [recipe, setRecipe] = useState()
    const [ingredients, setIngredients] = useState()
    const [user, token] = useAuth();
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

    async function getRecipeById() {
        try {
            let recipeResponse = await axios.get(`http://127.0.0.1:8000/api/recipes/${props.recipeId}/`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            let ingredientsResponse = await axios.get(`http://127.0.0.1:8000/api/recipes/all_ingredients/${props.recipeId}/`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            // const recipe = recipeResponse.data;
            // const ingredients = ingredientsResponse.data

            setRecipe(recipeResponse.data)
            setIngredients(ingredientsResponse.data)
            console.log(recipeResponse.data)
            console.log(ingredientsResponse.data)
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRecipeById();
    }, [token]);


    return ( 
        <div>
            <div>This is my recipe!</div>
            <h3>{recipe?.title}</h3>
            <img src={`http://127.0.0.1:8000${recipe?.image}/`} alt=''/>
            <h4>Chef: {recipe?.home_chef}</h4>
            <h5>Description: {recipe?.description}</h5>
            <h5>Category: {recipe?.category.category}</h5>
            <h5>Servings: {recipe?.serving_size}</h5>
            <div>
                <p>Ingredients:</p>
                <ul>
                    {ingredients?.map(item => (
                        <li key={item.name}>
                            {item.quantity} {item.units} of {item.ingredient_name}  
                        <br />
                        </li>
                    ))}
                </ul>
            </div>
            <h5>Recipe added by: {recipe?.user.username.charAt(0).toUpperCase() + recipe?.user.username.slice(1)}</h5>
            {/* <button onClick={ () => getRecipeById()}>Get Recipe by ID</button> */}
        </div>
        
     );
}

 
export default RecipeDisplay;
{/* <ul>{recipe?.ingredients.map(item => <li key={item.name}>{item.name}</li>)}</ul> */}
