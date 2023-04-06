import { useParams } from "react-router-dom";
import EditRecipeForm from "../../components/EditRecipeForm/EditRecipeForm";


const EditRecipePage = (props) => {
    const {recipeId} = useParams();
    console.log("EditRecipePage", recipeId)
    return ( 
        <section>
            <EditRecipeForm recipeId={recipeId} />
        </section>
     );
}
 
export default EditRecipePage;