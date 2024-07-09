import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginPage from "./components/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogPage from "./components/BlogPage";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const logginedUser = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(
        setNotification(
          { message: "wrong username or password", type: "error" },
          5,
        ),
      );
    }
  };

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
    <div>{!logginedUser ? <>{<LoginPage />}</> : <>{<BlogPage />}</>}</div>
  );
};

export default App;
