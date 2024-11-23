import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Login, Home, Dashboard} from './pages'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
          {
            path: "/",
            element: <Home />,
          },
          {
              path: "/login",
              element: (
                      <Login />
              ),
          },
          {
            path: "/dashboard",
            element: (
                    <Dashboard />
            ),
        },
      ],
    },
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <RouterProvider router = {router} />
  </React.StrictMode >
)
