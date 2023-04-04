import NewRecipeForm from "../NewRecipeForm/NewRecipeForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import React, {useState} from "react";


const NewIngredientsForm = (props) => {
    
    //New use states to add an ingredient and add a recipe ingredient to the database. Once this is done the recipe ingredient (name, qty, units) will be added as an object to the new recipe. 
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState();
    const [ingredientUnits, setIngredientUnits] = useState('');

    const [user, token] = useAuth();
    
    async function addNewRecipeIngredient() {
        try {
            let ingredientResponse = await axios.post(`http://127.0.0.1:8000/api/ingredients/`,
            {headers: {Authorization: "Bearer " + token}}
            );

            let recipeIngredientResponse = await axios.post(`http://127.0.0.1:8000/api/recipe_ingredient/${props.recipeID}/ingredients/${newIngredient.id}/`,
            {headers: {Authorization: "Bearer " + token}}
            );  
            
            
            console.log(ingredientResponse)
            console.log (recipeIngredientResponse)

        }catch (error) {
            console.error(error);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        let addedIngredient = {
            name: newIngredient
        }
        let addedRecipeIngredient = {
            quantity: ingredientQuantity,
            units: ingredientUnits
        }

        addNewRecipeIngredient(addedIngredient, addedRecipeIngredient);
    }
    
    return ( 
        <section onSubmit={handleSubmit}>
            <div>This is where you add recipe ingredients.</div>
            <form className="recipe-ingredient-container" >
                <div className="user-inputs">
                    <label>Quantity</label>
                    <input type= 'text' value={ingredientQuantity} onChange={(event) => setIngredientQuantity(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Units</label>
                    <input type= 'text' value={ingredientUnits} onChange={(event) => setIngredientUnits(event.target.value)} />
                </div>
                <div className="user-inputs">
                    <label>Ingredient</label>
                    <input type= 'text' value={newIngredient} onChange={(event) => setNewIngredient(event.target.value)} />
                </div>
                <div className="new-recipe-btn">
                    <button class='btn btn-outline-success' type='submit'>Add Ingredients</button>
                </div>
                {/* Need to put a mapper here to show the recipe ingredients that are created */}
            </form>
        </section>

     );
}
 
export default NewIngredientsForm;

