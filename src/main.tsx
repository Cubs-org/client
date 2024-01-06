import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Provider from './contexts/Provider.tsx'
import { AppRoutes } from './routes/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider>
        <AppRoutes />
      </Provider>
  </React.StrictMode>,
)
