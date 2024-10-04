import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserPost } from "../store/slices/dataSlice";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
} from "@mui/material";

function AddPost() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [submited, setSubmited] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.body && formData.title) {
      dispatch(
        addUserPost({
          title: formData.title,
          body: formData.body,
          userId: Number(userId),
        })
      );
      setSubmited(true);
    } else {
      window.alert("Please fill the form data!");
    }
  };

  return (
    <Container maxWidth="lg">
      <h1>New post</h1>

      {submited && (
        <Alert severity="success" sx={{ mb: 2 }}>
          A new post has been added!
          <Box>
            <Link to={`/users/${userId}/posts`}>Back to posts ?</Link>
          </Box>
        </Alert>
      )}

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              sx={{ mb: 3 }}
              id="title"
              label="Title"
              variant="outlined"
              name="title"
              value={formData.title}
              onInput={handleChange}
            />
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              placeholder="Post body"
              name="body"
              onInput={handleChange}
              multiline
              rows={6}
            />

            <Button
              sx={{ mt: 1 }}
              variant="contained"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddPost;
