import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserPost from "../components/post/UserPost";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

function UserPosts() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userData } = useSelector((state) => state.userData);
  const filteredData = userData.find((user) => user.id === Number(userId));

  useEffect(() => {
    if (!userData.length) {
      navigate("/");
    }
  }, [navigate, userData.length]);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid size={8}>
          <h1>User posts ({filteredData?.posts.length})</h1>
        </Grid>
        <Grid size={4} sx={{ textAlign: "right" }}>
          <Link to={`/users/${userId}/posts/new`}>
            <Button
              sx={{ mt: 2, marginLeft: "auto" }}
              variant="contained"
              color="success"
            >
              New post
            </Button>
          </Link>
        </Grid>
      </Grid>

      {filteredData?.posts.map((post) => (
        <UserPost key={post.id} post={post} />
      ))}
    </Container>
  );
}

export default UserPosts;
