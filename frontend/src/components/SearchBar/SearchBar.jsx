import React, {useState} from "react";


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
            <input className='search-input'type='search' onChange={(event) => setSearch(event.target.value)} value={search}/>
            <button type='submit' className="search-btn">Search</button>
            <div className="refresh-button">
                <button class="btn btn-outline-success glyphicon glyphicon-refresh" onClick={refresh}>Refresh</button>
            </div>
        </form>
     );
}
 
export default SearchBar;