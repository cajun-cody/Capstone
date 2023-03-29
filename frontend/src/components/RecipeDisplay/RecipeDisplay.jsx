import axios from "axios";
// import { useParams } from "react-router-dom";
import React, {useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


//Component to fetch a single recipe and display it. 
const RecipeDisplay = (props) => {
    // const {recipeId} = useParams();
    const [recipe, setRecipe] = useState()
    const [user, token] = useAuth();
    const ingredients = [{}];
   
    // Need the recipe ID from the RecipeList item that is clicked on
    // Send the ID as a param on the URL
    // Grab the ID with useParams here and use in the AXIOS URL request

    async function getRecipeById() {
        let response = await axios.get(`http://127.0.0.1:8000/api/recipes/${props.recipeId}/`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        setRecipe(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        getRecipeById();
    }, [token]);


    return ( 
        <div>
            <div>This is my recipe!</div>
            
            <h3>{recipe?.title}</h3>
            <img src={`http://127.0.0.1:8000${recipe?.image}/`} alt=''/>
            <h4>{recipe?.home_chef}</h4>
            <h5>{recipe?.description}</h5>
            <h5>{recipe?.serving_size}</h5>
            <div>
                <ul>{recipe?.ingredients.map(item => <li key={item.name}>{item.name}</li>)}</ul>
            </div>
            <h5>Recipe added by: {recipe?.user.username}</h5>
            {/* <button onClick={ () => getRecipeById()}>Get Recipe by ID</button> */}
        </div>
        
     );
}
 
export default RecipeDisplay;