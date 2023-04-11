import React, {useState} from "react";
import "./SearchBar.css";

//Component to allow user to search for a recipe
const SearchBar = (props) => {

    const [search, setSearch] = useState([])
    const refresh = () => window.location.reload(true)

    function handlesubmit(event){
        event.preventDefault();
        props.recipeSearchResults(search)
    }


    return ( 
        <form className="search-container" onSubmit={handlesubmit}>
            <input className='search-input'type='search' placeholder="Seach by Title, Home Chef or Category" onChange={(event) => setSearch(event.target.value)} value={search}/>
            <button type='submit' className="add-recipe-button">Search</button>
            <div className="refresh-button">
                <button class="add-recipe-button" onClick={refresh}>Refresh</button>
            </div>
        </form>
     );
}
 
export default SearchBar;