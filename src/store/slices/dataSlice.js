import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk for fetching the users data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const [users, posts] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then((resp) =>
      resp.json()
    ),
    fetch("https://jsonplaceholder.typicode.com/posts").then((resp) =>
      resp.json()
    ),
  ]);

  const data = users.map((user) => ({
    ...user,
    posts: posts.filter(({ userId }) => userId === user.id),
  }));
  return data;
});

// Define the async thunk for deleting the users post
export const deleteUserPost = createAsyncThunk(
  "post/deleteUserPost",
  async (postId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { METHOD: "DELETE" }
    );
    const jsonData = await response.json();
    return jsonData;
  }
);

// Define the async thunk to add new post of a user
export const addUserPost = createAsyncThunk(
  "post/addUserPost",
  async (payload) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        body: payload.body,
        userId: payload.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonData = await response.json();
    return jsonData;
  }
);

const dataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(addUserPost.fulfilled, (state, action) => {
        state.userData.forEach((user) => {
          if (user.id === action.payload.userId) {
            user.posts.push({
              userId: action.payload.userId,
              id: action.payload.id,
              title: action.payload.title,
              body: action.payload.body,
            });
          }
        });
      })
      .addCase(deleteUserPost.fulfilled, (state, action) => {
        state.userData.forEach((user) => {
          user.posts = user.posts.filter(
            (post) => post.id !== action.payload.id
          );
        });
      });
  },
});
export const { addPost, deletePost } = dataSlice.actions;
export default dataSlice.reducer;
