import { useState } from "react";
import UserComment from "../comment/UserComment";
import { useDispatch } from "react-redux";
import { deleteUserPost } from "../../store/slices/dataSlice";
import { Button, Card, CardContent } from "@mui/material";

function UserPost({ post }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);

  const handleComments = () => {
    setShowComments(!showComments);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this post?")) {
      dispatch(deleteUserPost(post.id));
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <h3 style={{ marginTop: 0 }}>{post.title}</h3>
        <p>{post.body}</p>
        <Button
          onClick={() => handleComments()}
          variant="outlined"
          size="small"
        >
          {showComments ? "Hide comments" : "Load comments"}
        </Button>
        <Button
          onClick={() => handleDelete()}
          variant="outlined"
          color="error"
          size="small"
          sx={{ ml: 1 }}
        >
          Delete
        </Button>

        {showComments && <UserComment postId={post.id} />}
      </CardContent>
    </Card>
  );
}

export default UserPost;
