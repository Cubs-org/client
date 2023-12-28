import { createBrowserRouter } from "react-router-dom"

import App from "../../App.tsx"
import Workspace from "../../pages/workspace.tsx"
import CalendarPage from "../../components/Calendar/Calendar.tsx"
import Profile from "../../components/Profile/index.tsx"
import NotFoundPage from "../../pages/NotFoundPage.tsx"
import Login from "../../pages/authentication/login.tsx"

// import { Layout as Lt } from "../../components/Layouts/Layout.tsx"
import Register from "../../pages/authentication/register.tsx"
import { Layout } from "../../components/Layouts/Layout.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
  },
  {
    path: ":id",
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
]);

  