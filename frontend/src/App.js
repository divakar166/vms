import { createBrowserRouter,RouterProvider, Navigate } from 'react-router-dom';
import { HomePage } from './pages/user';
import { AdminHomePage } from './pages/admin';
import { Login, Register, AdminLogin } from './pages/auth';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token')
  let isLoggedIn = !!token;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};

const AdminPrivateRoute = ({element}) => {
  const adminToken = localStorage.getItem('adminToken');
  let isAdminLoggedIn = !!adminToken;
  if(!isAdminLoggedIn){
    return <Navigate to="/admin/login" />
  }
  return element;
}

const router = createBrowserRouter([
  {
    path:'/',
    element:<PrivateRoute element={<HomePage />} />,
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/register",
    element:<Register />
  },
  {
    path:'/admin',
    element:<AdminPrivateRoute element={<AdminHomePage />} />,
  },
  {
    path:'/admin/login',
    element:<AdminLogin />,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
