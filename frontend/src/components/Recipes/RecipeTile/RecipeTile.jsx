

//Component to display the image, title and description of a recipe.
const RecipeTile = ({recipe}) => {
    return ( 
        <div className="grid-presenter">
            <div>
                <img src={recipe.image} alt=''/>
                <h3>{recipe.title}</h3>
            </div>

        </div>
     );
}
 
export default RecipeTile;