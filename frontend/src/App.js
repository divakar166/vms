import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Dashboard, VendorDetails, Login, Register } from './pages';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Dashboard />
  },
  {
    path:"/vendors/:id",
    element:<VendorDetails />
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
