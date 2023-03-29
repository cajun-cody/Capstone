import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import { useParams } from "react-router-dom";


const RecipePage = (props) => {
    const {recipeId} = useParams();



    return ( 
        <div>
            <RecipeDisplay recipeId={recipeId}/>
        </div>
     );
}
 
export default RecipePage;