

//Component to display the image, title and description of a recipe.
const RecipeTile = ({recipe}) => {
    return ( 
        <div className="grid-presenter">
            <div>
                <img src={`http://127.0.0.1:8000${recipe.image}/`} alt=''/>
                <h3>{recipe.title}</h3>
                <h3>{recipe.description}</h3>
            </div>

        </div>
     );
}
 
export default RecipeTile;