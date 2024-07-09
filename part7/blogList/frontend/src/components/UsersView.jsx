import { useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";
import Button from "@mui/material/Button";

const UsersView = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const dispatch = useDispatch();

  return (
    <div>
      <div>{user.name} logged in</div>
      <Button
        variant="contained"
        onClick={() => {
          window.localStorage.removeItem("loggedBlogappUser");
          dispatch(logout());
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default UsersView;
