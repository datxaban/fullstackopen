import { useState } from "react";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleAddBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
    // createBlog({
    //   title,
    //   author,
    //   url,
    // });
    setTitle("");
    setAuthor("");
    setUrl("");
    dispatch(
      setNotification(
        { message: `a new blog ${title} by ${author} added`, type: "noti" },
        5,
      ),
    );
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            data-testid="title"
            className="title-input"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            data-testid="author"
            className="author-input"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            data-testid="url"
            className="url-input"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
