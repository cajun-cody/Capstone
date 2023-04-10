
import "./Comment.css"


//Comment to display a comment to a video with any replies to that comment
const Comment = ({ comment }) => {

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return ( 
        <div className="comment-section">
            <div className="comment-item">
                <p className="comment-username">{capitalize(comment.user.username)} commented: </p>
                <p className="comment-text">{comment.comment}</p>
            </div>
        </div>
     );
}
 
export default Comment;

                {/* <div className="reply-list">
                    <ReplyList comment_id = {comment.id}/>
                </div>
                <div>
                    <ReplyForm comment_id={comment.id}/>
                </div> */}