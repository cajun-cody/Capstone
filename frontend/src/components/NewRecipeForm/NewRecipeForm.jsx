import axios from "axios";
import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import noimage from '../../Images/No-Image-Found.jpg';
// import CreatableSelect from 'react-select/creatable';


const NewRecipeForm = (props) => {

    
    const navigate = useNavigate();
    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeHome_chef, setRecipeHome_chef] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipeServing_size, setRecipeServing_size] = useState('');
    const [recipeImage, setRecipeImage] = useState(null);


    const [user, token] = useAuth();

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

    function navToAddIngredients () {
        navigate('/addIngredients')
    }


    async function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("title", recipeTitle);
        formData.append("home_chef", recipeHome_chef);
        formData.append("description", recipeDescription);
        formData.append("instructions", recipeInstructions);
        formData.append("serving_size", recipeServing_size);
        formData.append("image", recipeImage? recipeImage : noimage);
        formData.append("user_id", user.id);
        
        // await addNewIngredient(formData);
        addNewRecipe(formData).then(() => navToAddIngredients());
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
                    <button class='btn btn-outline-success' type='submit'>Add Recipe Ingredients</button>
                </div>
            </form>
        </section>
     );
    }
 
export default NewRecipeForm;