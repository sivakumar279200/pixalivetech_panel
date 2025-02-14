import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Login from "./Pages/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import ContactUs from "./Pages/Contact us/contactUs.jsx";
import Ourclients from "./Pages/Our clients/ourClients.jsx";
import { isAuthenticated } from "./Utils/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ViewContact from "./Pages/Contact us/viewContact.jsx";
import ViewClient from "./Pages/Our clients/viewClients.jsx";
import EditClient from "./Pages/Our clients/editCients.jsx";
import Laptoprental from "./Pages/Lap rental/laptopRental.jsx";
import ViewLaptop from "./Pages/Lap rental/viewRental.jsx";
import EditLaptop from "./Pages/Lap rental/editRental.jsx";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("You are not logged in!", { position: "top-right", autoClose: 3000 });
    }
  }, []);

  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

// Contact Us Layout
const Layout = () => (
  <>
    <Outlet />
  </>
);



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
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      {
        index: true, // Default child route for "/contactus"
        element: <ContactUs />,
      },
      {
        path: "viewcontact", // No leading slash needed
        element: <ProtectedRoute element={<ViewContact />} />,
      },
    ],
  },
  {
    path: "/ourclients",
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      {
        index: true, // Default child route for "/ourclients"
        element: <Ourclients />,
      },
      {
        path: "viewclient", // No leading slash needed
        element: <ProtectedRoute element={<ViewClient />} />,
      },
      {
        path: "editclient", // No leading slash needed
        element: <ProtectedRoute element={<EditClient />} />,
      }
    ],
  },
  {
    path:"/laptoprental",
    element:<ProtectedRoute element={<Layout />} />,
    children:[
      {
        index:true,
        element:<Laptoprental/>
      },
      {
        path:"viewlaptop",
        element:<ProtectedRoute element={<ViewLaptop/>}/>
      },
      {
        path:"editlaptop",
        element:<ProtectedRoute element={<EditLaptop/>}/>
      }
    ]
  }
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
