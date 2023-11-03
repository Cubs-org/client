import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Layout } from './components/Layouts/Layout.tsx'
import App from './App.tsx'
import { Calendar } from './components/Calendar/Calendar.tsx'
import Profile from './components/Profile/index.tsx.tsx'

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
  },
  {
      path: "/calendar",
      element: <Calendar />
  },
  {
      path: "/profile",
      element: <Profile />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>,
)
