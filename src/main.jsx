import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { router } from './routes/index.jsx';
import { RouterProvider } from 'react-router-dom';
import UserProvider from './context/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
