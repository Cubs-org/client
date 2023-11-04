import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Layout } from './components/Layouts/Layout.tsx'
import App from './App.tsx'
import { CalendarPage } from './components/Calendar/Calendar.tsx'
import Profile from './components/Profile/index.tsx.tsx'
import NotFoundPage from './NotFoundPage.tsx'
import { ModalProvider } from './contexts/modalContext.tsx'

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
  },
  {
      path: "/calendar",
      element: <CalendarPage />
  },
  {
      path: "/profile",
      element: <Profile />
  },
  {
    path: "*",
    element: <NotFoundPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ModalProvider>
  </React.StrictMode>,
)
