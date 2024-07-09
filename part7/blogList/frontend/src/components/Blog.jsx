import { useEffect, useState } from "react";
import { likeBlog, deleteBlogAction } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { setViewedBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.viewedBlog);
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));

  useEffect(() => {
    dispatch(setViewedBlog(id));
  }, [dispatch, id]);

  if (!blog) {
    return null;
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    // border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: "blue",
    color: "white",
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogAction(blog));
    }
    navigate("/");
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  return (
    <div style={blogStyle}>
      <div>
        <h2>
          {blog.title} {blog.author}{" "}
        </h2>
      </div>
      <div>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user && user.username === blog.user.username && (
        <div>
          <button style={removeButtonStyle} onClick={handleRemove}>
            remove
          </button>
        </div>
      )}
      <Comments id={blog.id} comments={blog.comments} />
    </div>
  );
};

export default Blog;
