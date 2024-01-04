import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./pages/Login";
import Board from "./pages/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/board",
    element: <Board />,
  },
]);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#034F20",
    },
    secondary: {
      main: "#209730",
      dark: "#12541B",
      light: "#40C95B",
    },
    background: {
      default: "#c0ffe2d9",
      paper: "#ffffff",
    },
    text: {
      secondary: "#209730",
      disabled: "#263E30",
    },
    success: {
      main: "#44911A",
    },
    error: {
      main: "#f75e5e",
    },
    warning: {
      main: "#CA7631",
    },
    info: {
      main: "#69A2AB",
    },
    divider: "rgba(68,119,55,0.24)",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
