import React, {useState, useEffect} from "react";
import RecipeList from "../../components/Recipes/RecipesList/RecipeList";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";


const SearchPage = () => {

    const [recipes, setRecipes] = useState([])

    async function getAllRecipes() {
        let response = await axios.get('http://127.0.0.1:8000/api/recipes/');
        setRecipes(response.data)
        console.log(response.data)
    }

    //Remember to add the [] as a parameter to prevent infinite loop
    useEffect(() => {
    getAllRecipes();
    },[]);


    function recipeSearchResults(search) {
        let filteredRecipes = recipes.filter((recipe) => {
            if (recipe.title.toLowerCase().includes(search.toLowerCase()) ||
                recipe.category.category.toLowerCase().includes(search.toLowerCase()) ||
                recipe.user.username.toLowerCase().includes(search.toLowerCase()) ||
                recipe.home_chef.toLowerCase().includes(search.toLowerCase()))    
                
            return true; 
            
        })
        setRecipes(filteredRecipes)
        console.log(filteredRecipes)
    }

    return ( 
        <section>
            <SearchBar recipeSearchResults={recipeSearchResults} />
            <RecipeList recipes={recipes}/>
        </section>
     );
}
 
export default SearchPage;