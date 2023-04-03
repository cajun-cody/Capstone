import axios from "axios";
import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
// import CreatableSelect from 'react-select/creatable';


const NewRecipeForm = (props) => {

    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeHome_chef, setRecipeHome_chef] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipeServing_size, setRecipeServing_size] = useState('');
    const [recipeImage, setRecipeImage] = useState(null);

    //New use states to add an ingredient and add a recipe ingredient to the database. Once this is done the recipe ingredient (name, qty, units) will be added as an object to the new recipe. 
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [ingredientUnits, setIngredientUnits] = useState('');

    const [user, token] = useAuth();

    async function addNewIngredient(newIngredient) {
        let response = await axios.post(`http://127.0.0.1:8000/api/ingredients/`,
        newIngredient,
        {headers: {Authorization: "Bearer " + token}});
        console.log(response.data)
    }



    async function addNewRecipe(newRecipe) {
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/recipes/new_recipe/', 
            newRecipe,
            {headers: {Authorization: "Bearer " + token, "Content-Type": "multipart/form-data"}}
        );
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
        }
    }

    
    async function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("title", recipeTitle);
        formData.append("home_chef", recipeHome_chef);
        formData.append("description", recipeDescription);
        formData.append("instructions", recipeInstructions);
        formData.append("serving_size", recipeServing_size);
        formData.append("image", recipeImage);
        formData.append("user_id", user.id);
        
        // await addNewIngredient(formData);
        addNewRecipe(formData);
    }
    

    return ( 
        <section>
            <div>Add a new recipe!</div>
            <form className="recipe-form-container" onSubmit={handleSubmit}>
                <div className="user-inputs">
                    <label>Title</label>
                    <input type= 'text' value={recipeTitle} onChange={(event) => setRecipeTitle(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Home Chef</label>
                    <input type= 'text' value={recipeHome_chef} onChange={(event) => setRecipeHome_chef(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Description</label>
                    <input type= 'text' value={recipeDescription} onChange={(event) => setRecipeDescription(event.target.value)} />
                </div>
                <div>
                    <label>Ingredients:</label>
                    <input type='text' ></input>
                </div>

                <div className="user-inputs">
                    <label>Instructions</label>
                    <input type= 'text' value={recipeInstructions} onChange={(event) => setRecipeInstructions(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Servings</label>
                    <input type= 'text' value={recipeServing_size} onChange={(event) => setRecipeServing_size(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Image</label>
                    <input type= 'file' onChange={(event) => setRecipeImage(event.target.files[0])} accept="image/jpeg,image/png,image/gif" />
                </div>
                <div className="new-recipe-btn">
                    <button class='btn btn-outline-success' type='submit'>Add New Recipe</button>
                </div>

            </form>
        </section>
     );
    }
 
export default NewRecipeForm;