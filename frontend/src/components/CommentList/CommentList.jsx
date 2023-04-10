import Comment from "../Comment/Comment";
import axios from "axios";
import {useState, useEffect} from "react";
import useAuth from "../../hooks/useAuth";


//Component to perform a GET and display a list of comments of a recipe
const CommentList = (props) => {

    const [comments, setComments] = useState();
    const [user, token] = useAuth();

    async function getAllComments() {
        let response = await axios.get(`http://127.0.0.1:8000/api/comments/${props.recipe_id}/`, {
            headers: {
                Authorization: "Bearer " + token,
        },
        });
        setComments(response.data);
        console.log(response.data)
    }
 
    //Added videoId to bring in comments only related to the chosen recipe.
   useEffect(() => {
        getAllComments();
    }, [props.recipe_id])    


    return ( 
        <div className="comment-list">
            <h4>Comments</h4>
            {comments&&comments.map( item => <Comment key={item.id}comment={item}/>)}
        </div>

     );
}
 
export default CommentList;