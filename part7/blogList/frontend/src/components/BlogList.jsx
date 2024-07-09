import { useSelector } from "react-redux";
import Blog from "./Blog";
import { Routes, Route, Link } from "react-router-dom";
import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((response) => {
        setBlogs(blogs.concat(response));
        blogFormRef.current.toggleVisibility();
        setErrorMessage(
          `a new blog ${response.title} by ${response.author} added`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage("error adding blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {!!blogs && (
        <List>
          {blogs.map((blog) => (
            <ListItem key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      )}
      {/* {!!blogs &&
        blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))} */}
    </>
  );
};

export default BlogList;
