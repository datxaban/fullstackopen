import { Link as L } from "react-router-dom";
import UsersView from "./UsersView";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Menu = () => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit">
          <L to="/">Blogs</L>
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <L to="/users">Users</L>
        </Link>
      </Breadcrumbs>
      <div>
        <UsersView />
      </div>
    </div>
  );
};

export default Menu;
