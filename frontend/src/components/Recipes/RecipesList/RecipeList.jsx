import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import RecipeTile from "../RecipeTile/RecipeTile";
import axios from "axios";


//Component to map over all recipes
const RecipeList = (props) => {

const [recipes, setRecipes] = useState()
// const [user, token] = useAuth();

async function getAllRecipes() {
    let response = await axios.get('http://127.0.0.1:8000/api/recipes/');
    setRecipes(response.data)
    console.log(response.data)
}
//
// useEffect(() => {
//     getAllRecipes();
// });

return ( 
    <div className="gird-container">
        <div>These are my recipes</div>
        <div className="grid-thumbnail">
             {recipes&&recipes.map( item => <RecipeTile key={item.id} recipe={item} />)} 
            <button onClick={ () => getAllRecipes()}>Get Recipes</button>
        </div>
        
    </div>
    
 );
}

export default RecipeList;