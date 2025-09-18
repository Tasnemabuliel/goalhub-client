import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Players from './pages/Players/Players'
import Positions from './pages/Positions/Positions'

// 🟢 דפי סופר אדמין
import SuperAdminDashboard from './pages/SuperAdminDashboard/SuperAdminDashboard'
import SuperAdminLogin from './pages/SuperAdminLogin/SuperAdminLogin'

import './styles/global.css'

// כאן מגדירים את כל הראוטים
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'players', element: <Players /> },
      { path: 'positions', element: <Positions /> },

      // 🟢 ראוטים חדשים לסופר אדמין
      { path: 'superadmin/login', element: <SuperAdminLogin /> },
      { path: 'superadmin/dashboard', element: <SuperAdminDashboard /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
