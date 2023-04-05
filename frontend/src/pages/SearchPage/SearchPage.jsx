import React, {useState, useEffect} from "react";
import RecipeList from "../../components/Recipes/RecipesList/RecipeList";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";


const SearchPage = () => {

    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    async function getAllRecipes() {
        let response = await axios.get('http://127.0.0.1:8000/api/recipes/');
        setRecipes(response.data)
        setFilteredRecipes(response.data);
        console.log(response.data);
    }

    //Remember to add the [] as a parameter to prevent infinite loop
    useEffect(() => {
    getAllRecipes();
    },[]);


    function recipeSearchResults(search) {
        let filtered = recipes.filter((recipe) => {
            if (recipe.title.toLowerCase().includes(search.toLowerCase()) ||
                recipe.category.category.toLowerCase().includes(search.toLowerCase()) ||
                recipe.user.username.toLowerCase().includes(search.toLowerCase()) ||
                recipe.home_chef.toLowerCase().includes(search.toLowerCase()))    
                
            return true; 
            
        })
        setFilteredRecipes(filtered)
        console.log(filtered)
    }

    return ( 
        <section>
            <SearchBar recipeSearchResults={recipeSearchResults} />
            <RecipeList recipes={filteredRecipes}/>
        </section>
     );
}
 
export default SearchPage;