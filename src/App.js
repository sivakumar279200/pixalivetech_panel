
import './App.css';
import react,{useState} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/header';
import Sidebar from './Components/sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  return (
    <div className="App">
      {/* <RouterProvider router={routes} /> */}
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </div>
  );
}

export default App;
