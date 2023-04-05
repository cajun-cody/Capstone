import NewIngredientsForm from "../../components/NewIngredientsForm/NewIngredientsForm";
import { useParams } from "react-router-dom";

const AddIngredientsPage = (props) => {
    const {recipeId} = useParams();
    console.log("AddIngredientsPage", recipeId)

    return ( 
        <section>
            <NewIngredientsForm recipeId={recipeId}/>
        </section>
     );
}
 
export default AddIngredientsPage;