import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignupPage from "./pages/SignupPage/SignupPage.tsx";
import ResetPswdPage from "./pages/ResetPswdPage/ResetPswdPage.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import ProfilePage from "./pages/profile-page/ProfilePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPswdPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem", // Set the font size for all TableCells
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
