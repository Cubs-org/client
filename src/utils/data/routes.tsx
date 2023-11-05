import { Route, Routes, createBrowserRouter } from "react-router-dom"

import App from '../../App.tsx'
import CalendarPage from '../../components/Calendar/Calendar.tsx'
import Profile from '../../components/Profile/index.tsx'
import NotFoundPage from '../../pages/NotFoundPage.tsx'
import Login from "../../pages/login.tsx"

import { Layout as Lt } from "../../components/Layouts/Layout.tsx"

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Lt><App /></Lt>
    },
    {
      path: "/calendar",
      element: <Lt><CalendarPage /></Lt>,
    },
    {
      path: "/profile",
      element: <Lt><Profile /></Lt>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path: "/landing",
    //   element: <LandingPage />,
    // },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  