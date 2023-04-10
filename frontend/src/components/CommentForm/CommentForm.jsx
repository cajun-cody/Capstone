import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./CommentForm.css";

//Form to create a new comment on a recipe
const CommentForm = (props) => {

    const [comment, setComment] = useState();
    const [user, token] = useAuth();
    const refresh = () => window.location.reload(true);

    async function postComment(newComment) {
        let response = await axios.post(`http://127.0.0.1:8000/api/comments/`, 
        newComment,
        {headers: {Authorization: "Bearer " + token}});
        
        // setComment(response.data);
        console.log(response.data)
    }

    function handleSubmit(event) {
        event.preventDefault();
        let newComment = {
            recipe_id: props.recipe_id,
            user: props.user,
            comment: comment
        };
        postComment(newComment);
    }

    return ( 
        <form onSubmit={handleSubmit} className='comment-form'>
            <label>Post a Comment</label>
            <div className="post-input">
                <input className='input' value={comment} onChange={(event) => setComment(event.target.value)}/>
                <button type='submit' className="comment-btn" onClick={refresh}>Post Comment</button>
            </div>
        </form>
     );
}
 
export default CommentForm;
