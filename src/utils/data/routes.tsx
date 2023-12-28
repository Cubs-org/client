import { Route, Routes, createBrowserRouter } from "react-router-dom"

import App from "../../App.tsx"
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
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/calendar",
        element: <CalendarPage />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  },
    {
      path: "/login",
      element: <Login />
    },
    
    {
      path: "/register",
      element: <Register />
    },
    // {
    //   path: "/landing",
    //   element: <LandingPage />,
    // },
    {
      path: "*",
      element: <NotFoundPage />
    },
  ]);
  