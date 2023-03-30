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
//Remember to add the [] as a parameter to prevent infinite loop
useEffect(() => {
    getAllRecipes();
},[]);


//Mapper includes a link in the list of recipes. The link has a path to the recipe display page.
return ( 
    <div className="gird-container">
        <div>These are my recipes</div>
        <div className="grid-thumbnail">
             {recipes&&recipes.map( item =>  <Link to={`/recipe/${item.id}`} onClick={() => setRecipes(item.id)}>
             <RecipeTile  key={item.id} recipe={item} />
             </Link>)} 
            {/* <button onClick={ () => getAllRecipes()}>Get Recipes</button> */}
        </div>
        
    </div>
    
 );
}

export default RecipeList;