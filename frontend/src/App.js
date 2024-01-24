import { createBrowserRouter,RouterProvider, Navigate } from 'react-router-dom';
import { Dashboard, VendorDetails, Login, Register } from './pages';
import { useAuth } from './pages/AuthContext';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token')
  let isLoggedIn = !!token;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path:'/',
    element:<PrivateRoute element={<Dashboard />} />,
  },
  {
    path:"/vendors/:id",
    element:<PrivateRoute element={<VendorDetails />} />,
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/register",
    element:<Register />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
