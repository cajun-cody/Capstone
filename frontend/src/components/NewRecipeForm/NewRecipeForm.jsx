import axios from "axios";
import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./NewRecipeForm.css";

//Component to create a new basic recipe. Button at bottom will take user to page to add ingredients to the new recipe. 
const NewRecipeForm = (props) => {
    
    const navigate = useNavigate();
    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeHome_chef, setRecipeHome_chef] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeCategory, setRecipeCategory] = useState();
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipeServing_size, setRecipeServing_size] = useState('');
    const [recipeImage, setRecipeImage] = useState(['']);
    // const [recipeId, setRecipeId]   = useState(null);//new state variable to hold state of recipe Id to pass into recipe ingredients form.
    const [categories, setCategories] = useState([]);

    const [user, token] = useAuth();

    //Function to get a list of categories for a dropdown list to choose from.
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/category/all/" , 
                {
                    headers: {Authorization: "Bearer " + token,}
                }
                );
            setCategories(response.data);
        } catch (error) {
            console.log(error.response.data)
        }
        };
        getCategories();
    }, [token]);
    

    
    async function addNewRecipe(newRecipe) {
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/recipes/new_recipe/', 
            newRecipe,
            {headers: {Authorization: "Bearer " + token, "Content-Type": "multipart/form-data"}}
        );
        console.log(response.data);
        // setRecipeId(response.data.id) //Set state of recipe id.
        if (response.status === 201){
            navigate(`/addIngredients/${response.data.recipe_id}`)
        }
    } catch (error) {
        console.log(error.response.data);
        }
    }

    //HandleSubmit for form.data. Form.data used to add an image file. 
    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        // debugger
        formData.append("title", recipeTitle);
        formData.append("home_chef", recipeHome_chef);
        formData.append("description", recipeDescription);
        formData.append("instructions", recipeInstructions);
        formData.append("serving_size", recipeServing_size);
        formData.append("image", recipeImage);
        formData.append("user_id", user.id);
        formData.append("category_id", recipeCategory);
             
        await addNewRecipe(formData)
    }
    

    return ( 
        <section className="new-recipe-section">
            <div className="recipe-header">What Yall Cookin??</div>
            <form className="recipe-form-container" onSubmit={e=>handleSubmit(e)}>
                <div className="user-inputs">
                    <label>Title</label>
                    <input className="recipe-input" type= 'text' value={recipeTitle} onChange={(event) => setRecipeTitle(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Home Chef</label>
                    <input className="recipe-input" type= 'text' value={recipeHome_chef} onChange={(event) => setRecipeHome_chef(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Category</label>
                    <select className="recipe-select" value={recipeCategory} onChange={(event) => setRecipeCategory(event.target.value)}> 
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.category}
                        </option>
                        ))}
                    </select>       
                </div>
                <div className="user-inputs">
                    <label>Description</label>
                    <textarea className="recipe-textarea" type= 'text' value={recipeDescription} onChange={(event) => setRecipeDescription(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Instructions</label>
                    <textarea className="recipe-textarea" type= 'text' value={recipeInstructions} onChange={(event) => setRecipeInstructions(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Recipe Servings</label>
                    <input className="recipe-input" type= 'number' value={recipeServing_size} onChange={(event) => setRecipeServing_size(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Image</label>
                    <input className="recipe-input" type= 'file' onChange={(event) => setRecipeImage(event.target.files[0])} accept="image/jpeg,image/png,image/gif" />
                </div>
                <div className="add-recipe-btn-section">
                    <button className='add-recipe-button' type='submit'>Add Recipe Ingredients</button>
                </div>
            </form>
        </section>
     );
    }
 
export default NewRecipeForm;