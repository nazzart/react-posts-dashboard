import { Avatar, Box, CircularProgress, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";

function UserComment({ postId }) {
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsFetching(false);
        setComments(data);
      });
  }, [postId]);

  if (isFetching)
    return (
      <div>
        <CircularProgress sx={{ mt: 1 }}>Loading..</CircularProgress>
      </div>
    );

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <Box sx={{ padding: "10px" }} key={comment.id}>
            <Divider variant="fullWidth" style={{ marginBottom: "30px" }} />
            <Grid container wrap="nowrap" spacing={2}>
              <Grid>
                <Avatar sx={{ bgcolor: "#1F6CFA" }}>
                  {comment.email.substring(0, 1)}
                </Avatar>
              </Grid>
              <Grid justifyContent="left" sx={{ width: "100%" }}>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {comment.email}
                </h4>
                <p style={{ textAlign: "left" }}>{comment.body}</p>
              </Grid>
            </Grid>
          </Box>
        ))}
    </>
  );
}

export default UserComment;
