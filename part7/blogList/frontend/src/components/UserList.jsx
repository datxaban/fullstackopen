import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import users from "../services/users";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const UserList = () => {
  const dispatch = useDispatch();
  const all_users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <h2>Name</h2>{" "}
              </TableCell>
              <TableCell align="right">
                {" "}
                <h2>Blogs created</h2>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {all_users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`/users/${row.id}`}>{row.name}</Link>{" "}
                </TableCell>
                <TableCell align="right">{row.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div>
        {all_users.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>{" "}
            {user.blogs.length}
          </div>
        ))}
      </div> */}
    </div>
  );
};
export default UserList;
