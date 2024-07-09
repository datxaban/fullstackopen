import { useRef } from "react";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";
import { useState, useEffect } from "react";
import UserList from "./UserList";
import BlogList from "./BlogList";
import blogService from "../services/blogs";
import Blog from "./Blog";
import Menu from "./Menu";
import Author from "./Author";
import Button from "@mui/material/Button";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useMatch,
} from "react-router-dom";

const BlogPage = () => {
  const blogFormRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Menu />
      <h2>blog app</h2>
      <Notification />
      {/* <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable> */}
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<Author />} />
      </Routes>
    </>
  );
};

export default BlogPage;
