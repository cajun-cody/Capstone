import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


//Component to fetch a single recipe and display it. 
const RecipeDisplay = (props) => {
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState()
    const [user, token] = useAuth();

    // Need the recipe ID from the RecipeList item that is clicked on
    // Send the ID as a param on the URL
    // Grab the ID with useParams here and use in the AXIOS URL request

    async function getRecipeById() {
        let response = await axios.get('http://127.0.0.1:8000/api/recipes/1/', {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        setRecipe(response.data)
        console.log(response)
    }

    useEffect(() => {
        getRecipeById();
    }, [token]);


    return ( 
        <div>
            <div>This is my recipe!</div>
            <button onClick={ () => getRecipeById()}>Get Recipe by ID</button>
        </div>
        
     );
}
 
export default RecipeDisplay;