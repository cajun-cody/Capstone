import React, {useState, useEffect} from "react";
import RecipeList from "../../components/Recipes/RecipesList/RecipeList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import NewRecipeForm from "../../components/NewRecipeForm/NewRecipeForm";
import "./MyRecipesPage.css";


const MyRecipesPage = () => {

    const [recipes, setRecipes] = useState([])
    const [user, token] = useAuth();

    async function getUserRecipes() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/recipes/user_recipes/${user.id}`, {
                headers: {
                    Authorization: "Bearer " + token,
            },
        });    
        setRecipes(response.data)
        console.log(response.data)
        console.log(user)
    } catch (error) {
        console.error(error);
    }
    }
// 
    useEffect(() => {
        getUserRecipes();
    }, [token]);



    return ( 
        <>
            <div className="add-recipe-link">
                <a href="http://localhost:3000/newrecipe/">Click to Add New Recipe</a>
            </div>
            <div className="recipe-header">My recipes</div>
            <RecipeList recipes={recipes}/>
        </>


     );
}
 
export default MyRecipesPage;