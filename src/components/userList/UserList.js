import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../store/slices/dataSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Container } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function UserList() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);

  useEffect(() => {
    if (!userData.length) {
      dispatch(fetchData());
    }
  }, [dispatch, userData.length]);

  return (
    <Container maxWidth="lg">
      <h1>Dashboard</h1>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, a: { textDecoration: "none" } }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">
                <strong>ID</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Name</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Username</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Posts</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Link to={`/users/${row.id}/posts`}>
                    <Avatar {...stringAvatar(row.name)}>
                      {row.name.substring(0, 1)}
                    </Avatar>
                  </Link>
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">
                <Link to={`/users/${row.id}/posts`}>{row.name}</Link></TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.posts.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UserList;
