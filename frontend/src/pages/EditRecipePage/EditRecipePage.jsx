
import EditRecipeForm from "../../components/EditRecipeForm/EditRecipeForm";
import { useLocation } from "react-router-dom";

const EditRecipePage = (props) => {
    const {state} = useLocation();
    
    return ( 
        <section>
            <EditRecipeForm recipe={state.recipe} ingredients={state.ingedients} />
        </section>
     );
}
 
export default EditRecipePage;