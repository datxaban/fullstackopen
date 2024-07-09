import Notification from "./Notification";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(username, password));
      navigate("/");
    } catch (error) {
      dispatch(
        setNotification(
          { message: "wrong username or password", type: "error" },
          5,
        ),
      );
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <Notification />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          id="outlined-password-input"
          label="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained" color="primary">
          login
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
