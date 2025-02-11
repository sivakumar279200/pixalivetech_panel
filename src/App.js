import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Login from "./Pages/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import ContactUs from "./Pages/Contact us/contactUs.jsx";

import { isAuthenticated } from "./Utils/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ViewContact from "./Pages/Contact us/viewcontact.jsx";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("You are not logged in!", { position: "top-right", autoClose: 3000 });
    }
  }, []);

  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

// Contact Us Layout (for nested routing)
const ContactUsLayout = () => {
  return (
    <>
      <Outlet /> {/* Renders child routes */}
    </>
  );
};

// Define routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: "/contactus",
    element: <ProtectedRoute element={<ContactUsLayout />} />,
    children: [
      {
        index: true, // Default child route for "/contactus"
        element: <ContactUs />,
      },
      {
        path: "viewcontact", // No leading slash
        element: <ProtectedRoute element={<ViewContact />} />,
      },
    ],
  },
]);

// App Component
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
