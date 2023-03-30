import React, {useState, useEffect} from "react";
import RecipeList from "../../components/Recipes/RecipesList/RecipeList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";


const MyRecipesPage = () => {

    const [recipes, setRecipes] = useState([])
    const [user, token] = useAuth();

    async function getUserRecipes() {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/recipes/user_recipes/2', {
                headers: {
                    Authorization: "Bearer " + token,
            },
        });    
        setRecipes(response.data)
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
    }

    useEffect(() => {
        getUserRecipes();
    }, []);



    return ( 
        <section>
            <div>This Is My Recipe Page</div>
            <RecipeList recipes={recipes}/>
        </section>
     );
}
 
export default MyRecipesPage;