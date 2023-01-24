import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'

// Layouts
import Layout from './components/layouts/Layout'
import PortalLayout from './components/layouts/PortalLayout'

// Main
import Home from './pages/home'

// Auth
import LoginPage from './pages/auth/login'
import Register from './pages/auth/register'
import ForgotPassword from './pages/forgot_password'
import ResetPasswordPage from './pages/auth/reset_password'

// Verify
import VerifyAccountPage from './pages/verify/verify_account'

// Portal
import Dashboard from './pages/portal/dashboard'
import Course from './pages/portal/course'

// Not found
import PageNotFound from './pages/404'
import Modal from './pages/portal/modal'

const router = createBrowserRouter([
  // Main
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'reset-password',
    element: <ResetPasswordPage />,
  },
  // Verify
  {
    path: '/verify/account',
    element: <VerifyAccountPage />,
  },
  // Portal
  {
    element: <PortalLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'course',
        element: <Course />,
      },
      {
        path: 'modal',
        element: <Modal />,
      },
      // TODO: Course
      // TODO: Batch
      // TODO: etc
    ],
  },

  // 404
  {
    path: '*',
    element: <PageNotFound />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
