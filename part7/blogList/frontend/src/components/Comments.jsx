import { useState } from "react";
import { commentBlog } from "../reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";

const Comments = ({ id, comments }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleAddComment = () => {
    dispatch(commentBlog(id, comment));
    setComment("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddComment();
    }
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <h3>comments</h3>
      <input
        value={comment}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />{" "}
      <button onClick={handleAddComment}>add comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
