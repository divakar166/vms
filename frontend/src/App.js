// src/App.js
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import VendorList from './pages/VendorList';
import VendorDetails from './pages/VendorDetails';

const router = createBrowserRouter([
  {
    path:'/',
    element:<VendorList />
  },
  {
    path:"/vendors/:id",
    element:<VendorDetails />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
