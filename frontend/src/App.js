import { createBrowserRouter,RouterProvider, Navigate } from 'react-router-dom';
import { HomePage } from './pages/user';
import { Login, Register } from './pages/auth';

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
    element:<PrivateRoute element={<HomePage />} />,
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
