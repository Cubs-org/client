// Main App
import { Layout } from "../components/Layouts/Layout";

// Pages
import App from "../App";
import CalendarPage from "../pages/Calendar.tsx";
import Home from "../pages/Home.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import Profile from "../pages/Profile.tsx";
import Page from "../pages/Page.tsx";
import Login from "../pages/authentication/Login.tsx";
import Register from "../pages/authentication/Register.tsx";
import Workspace from "../pages/Workspace.tsx";

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
                element: <section className="w-full h-[80vh]"><NotFoundPage /></section>
              }
            ]
        }
    ],
    authenticated: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "/workspace/:id",
                element: <Workspace />
              },
              {
                path: "/page/:id",
                element: <Page />
              },
              {
                path: "calendar",
                element: <CalendarPage />
              },
              {
                path: "goals",
                element: <div>Goals</div>
              },
              {
                path: "profile",
                element: <Profile />
              },
              {
                path: "*",
                element: <NotFoundPage />
              }
            ]
          }
        ]
      }
    ]
};