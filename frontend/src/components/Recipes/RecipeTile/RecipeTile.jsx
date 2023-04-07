import "./RecipeTile.css";

//Component to display the image, title and description of a recipe.
const RecipeTile = ({recipe}) => {
    return ( 
        <div className="recipe-tile">
            <img src={`http://127.0.0.1:8000${recipe.image}/`} alt=''/>
            <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <h3>{recipe.description}</h3>
            </div>

        </div>
     );
}
 
export default RecipeTile;