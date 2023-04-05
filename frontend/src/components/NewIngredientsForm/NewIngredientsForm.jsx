
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import React, {useState, useEffect} from "react";


const NewIngredientsForm = ({recipeId}) => {
    console.log("NewIngredientsForm", recipeId)
    
    //New use states to add an ingredient and add a recipe ingredient to the database. Once this is done the recipe ingredient (name, qty, units) will be added as an object to the new recipe. 
    // const [recipeIngredients, setRecipeIngredients] = useState([])
    const [ingredient, setIngredient] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState();
    const [ingredientUnits, setIngredientUnits] = useState('');
    // const [recipeId, setRecipeId] = useState();
    const [user, token] = useAuth();
    const refresh = () => window.location.reload(true);
    //State to hold all ingredients added and map out in return. 
    const [ingredients, setIngredients] = useState([]);
    

    //Function to add a new RecipeIngredient and pass into the url the RecipeID and the user input for ingredient.
    async function addNewRecipeIngredient() {
        try {
            let recipeIngredientResponse = await axios.post(`http://127.0.0.1:8000/api/recipe_ingredient/recipes/${recipeId}/ingredients/${ingredient}/add/`, 
            {   
                quantity: ingredientQuantity,
                units: ingredientUnits,
                },
            {    headers: {
                    Authorization: "Bearer " + token,
                }}
            );  
            console.log (recipeIngredientResponse)
            // setIngredient(recipeIngredientResponse)
        } catch (error) {
            console.error(error);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        let addedIngredient = {
            name: ingredient
        }
        let addedRecipeIngredient = {
            quantity: ingredientQuantity,
            units: ingredientUnits
        }

        addNewRecipeIngredient(addedIngredient, addedRecipeIngredient);
    }

    async function listIngredients() {
        try {
            let ingredientsResponse = await axios.get(`http://127.0.0.1:8000/api/recipes/all_ingredients/${recipeId}/`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
            setIngredients(ingredientsResponse.data)
            console.log(ingredientsResponse.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        listIngredients();
    }, [])

    const handleViewNewRecipe = (event) => {
        // redirect the user to the recipe view page for the newly created recipe's ID
        window.location.href = `/recipe/${recipeId}`;
      };
    
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
                    <input type= 'text' value={ingredient} onChange={(event) => setIngredient(event.target.value)} />
                </div>
                <div className="new-recipe-btn">
                    <button  type='submit' onClick={refresh} >Add Ingredient</button>
                </div>
            </form>
                <div>
                    <p>Ingredients:</p>
                    <ul style={{display:"flex",flexDirection:"column"}} >
                        {ingredients?.map(item => (
                            <li key={item}>
                                {item.quantity} {item.units} of {item.ingredient_name}  
                            <br />
                            </li>
                        ))}
                    </ul>
                </div>
            <button onClick={handleViewNewRecipe}>View New Recipe</button>
        </section>

     );
}
 
export default NewIngredientsForm;

// 