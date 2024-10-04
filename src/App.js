import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import UserPosts from "./pages/UserPosts";
import AddPost from "./pages/AddPost";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "users/:userId/posts",
    element: <UserPosts />,
  },
  {
    path: "users/:userId/posts/new",
    element: <AddPost />,
  },
]);

function App() {
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
