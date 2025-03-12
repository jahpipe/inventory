import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginForm from './pages/login/LoginForm.jsx'
import AdminDashboard from './dashboardAdmin/AdminDashboard.jsx'


const router = createBrowserRouter([{
  path: "/",
  element: <App/>
},
{
  path: "/Login",
  element: <LoginForm/>
},

{
  path: "/dashboardAdmin",
  element: <AdminDashboard/>
},

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
