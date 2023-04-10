import React, {useState} from "react";
import { Link } from "react-router-dom";
import RecipeTile from "../RecipeTile/RecipeTile";
import "./RecipeList.css";


//Component to map over all recipes
const RecipeList = (props) => {

const [recipes, setRecipes] = useState()
// const [user, token] = useAuth();TestOne



//Mapper includes a link in the list of recipes. The link has a path to the recipe display page.
return ( 
    <div className="gird-container">
        
        <div className="grid-thumbnail">
             {props.recipes&&props.recipes.map( item => <Link to={`/recipe/${item.id}`} onClick={() => setRecipes(item.id)}>
             <RecipeTile  key={item.id} recipe={item} />
             </Link>)} 
            {/* <button onClick={ () => getAllRecipes()}>Get Recipes</button> */}
        </div>
        
    </div>
    
 );
}

export default RecipeList;