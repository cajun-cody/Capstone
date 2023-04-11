import {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const EditRecipeForm = (props) => {
    const navigate = useNavigate();
    // const [recipe, setRecipe] = useState();
    // const [ingredients, setIngredients] = useState();
    // const {recipeId} = useParams();
    const [user, token] = useAuth();   
    
    //Variables to control state of changes. 
    const [recipeTitle, setRecipeTitle] = useState(props.recipe.title);
    const [recipeHome_chef, setRecipeHome_chef] = useState(props.recipe.home_chef);
    const [recipeDescription, setRecipeDescription] = useState(props.recipe.description);
    const [recipeCategory, setRecipeCategory] = useState(props.recipe.category.id);
    const [recipeInstructions, setRecipeInstructions] = useState(props.recipe.instructions);
    const [recipeServing_size, setRecipeServing_size] = useState(props.recipe.serving_size);
    const [recipeImage, setRecipeImage] = useState([]);
    const [categories, setCategories] = useState([]);

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

    //Function to Update a recipe
    async function updateRecipe(updatedRecipe) {
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/recipes/${props.recipe.id}/`, 
            updatedRecipe,
            {headers: {Authorization: "Bearer " + token, "Content-Type": "multipart/form-data"}}
        );
        console.log(response.data);
        if (response.status === 202){
            navigate(`/recipe/${response.data.id}`)
        }
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
        formData.append("category_id", recipeCategory);
        
        updateRecipe(formData)
    }


    return ( 
        <div className="recipe-container">
            <div className="recipe-header">You Can Edit Recipe Here</div>
            <form className="recipe-edit-form-container" onSubmit={e=>handleSubmit(e)} >
                <div className="user-inputs">
                   <label>Title </label> 
                    <input className="recipe-input" type="text" placeholder={props.recipe?.title} onChange={(event) => setRecipeTitle(event.target.value)}/>
                </div>
                <div className="user-inputs">
                    <img src={`http://127.0.0.1:8000${props.recipe?.image}/`} alt=''/>
                    <label>Change Image</label>
                    <input className="recipe-input" type="file" onChange={(event) => setRecipeImage(event.target.files[0])} accept="image/jpeg,image/png,image/gif" />
                </div>
                <div className="user-inputs">
                    <label>Home Chef </label>
                    <input className="recipe-input" type="text" placeholder={props.recipe?.home_chef} onChange={(event) => setRecipeHome_chef(event.target.value)}/>   
                </div>
                <div className="user-inputs">
                    <label>Category</label>
                        <select className="recipe-select" onChange={(event) => setRecipeCategory(event.target.value)}> 
                            <option value={props.recipe?.category.id} >{props.recipe?.category.category}</option>
                            {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category}
                            </option>
                            ))}
                        </select>               
                </div>
                <div className="user-inputs">
                    <label>Description </label>
                    <textarea className="recipe-textarea" type="text" placeholder={props.recipe?.description} onChange={(event) => setRecipeDescription(event.target.value)}/>
                </div>
                <div className="user-inputs">
                    <label>Instructions </label> 
                    <textarea className="recipe-textarea" type="text" placeholder={props.recipe?.instructions} onChange={(event) => setRecipeInstructions(event.target.value)}/>
                </div>
                <div className="user-inputs">
                    <label>Recipe Servings </label>
                    <input className="recipe-input" type="number" min="1" placeholder={props.recipe?.serving_size} onChange={(event) => setRecipeServing_size(parseInt(event.target.value))}/>
                </div>
                <div className="recipe-ingredients">
                    <h2>Ingredients:</h2>
                    <ul className="ingredients-list" style={{display:"flex",flexDirection:"column"}}>
                        {props.ingredients?.map(item => (
                            <li key={item.name}>
                                {item.quantity} {item.units} of {item.ingredient_name}  
                            <br />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="edit-recipe-btn">
                    <button className='add-recipe-button' type='submit' >Update Recipe</button>
                </div>
            </form>
        </div>
     );
}
 
export default EditRecipeForm;