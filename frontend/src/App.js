import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { VendorList, VendorDetails, Login, Register } from './pages';

const router = createBrowserRouter([
  {
    path:'/',
    element:<VendorList />
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
