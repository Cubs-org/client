import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom"

import Provider from './contexts/Provider.tsx'
import { router } from './routes/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
