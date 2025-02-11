import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./Pages/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import { isAuthenticated } from "./Utils/auth"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactUs from "./Pages/Contact us/contactUs.jsx";

const ProtectedRoute = ({ element }) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("You are not logged in!", { position: "top-right", autoClose: 3000 });
    }
  }, []);

  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

function App() {
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
      path:"/contactus",
      element:<ProtectedRoute element={<ContactUs/>} />
    }
  ]);

  return (
    <div className="App">
      <ToastContainer  /> {/* Ensure ToastContainer is included */}
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
