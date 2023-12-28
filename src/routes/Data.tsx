// Main App
import { Layout } from "../components/Layouts/Layout";

// Pages
import App from "../App";
import CalendarPage from "../components/Calendar/Calendar";
import Profile from "../components/Profile/index.tsx";
import Home from "../pages/Home.tsx";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Workspace from "../pages/Workspace.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

export const data = {
    notAuthenticated: [
        {
            path: "/",
            element: <App />,
            children: [
              {
                path: "",
                element: <Home />
              },
              {
                path: "login",
                element: <Login />
              },
              {
                path: "register",
                element: <Register />
              },
              {
                path: "*",
                element: <NotFoundPage />
              },
            ]
        }
    ],
    authenticated: [
      {
        path: ":id",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "", // Acesse /:id e vá para a Workspace
                element: <Workspace />
              },
              {
                path: "calendar",
                element: <CalendarPage />
              },
              {
                path: "profile",
                element: <Profile />
              }
            ]
          }
        ]
      }
    ],
    admin: []
};