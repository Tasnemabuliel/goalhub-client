import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import Home from './pages/Home';
import SuperAdminRegister from './pages/SuperAdmin/Register';
import SuperAdminVerify from './pages/SuperAdmin/Verify';
import SuperAdminLogin from './pages/SuperAdmin/Login';
import SuperAdminLoginVerify from './pages/SuperAdmin/LoginVerify';
import SuperAdminDashboard from './pages/SuperAdmin/Dashboard';
import Test from './pages/Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <Home /> },
      { path: '/superadmin', element: <Navigate to="/superadmin/dashboard" /> },
      { path: '/superadmin/register', element: <SuperAdminRegister /> },
      { path: '/superadmin/verify', element: <SuperAdminVerify /> },
      { path: '/superadmin/login', element: <SuperAdminLogin /> },
      { path: '/superadmin/login/verify', element: <SuperAdminLoginVerify /> },
      { path: '/superadmin/dashboard', element: <SuperAdminDashboard /> },
      { path: '/test', element: <Test /> },
      // אין דפים כרגע
    ]
  }
]);

export default function Main() {
  return <RouterProvider router={router} />;
}
