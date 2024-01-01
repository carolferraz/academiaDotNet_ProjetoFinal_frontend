import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Board from './pages/Board';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Board />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
