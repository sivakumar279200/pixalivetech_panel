import React from "react";
import { FiHome, FiUser, FiSettings, FiPhone, FiBriefcase, FiMonitor, FiUsers, FiTool } from "react-icons/fi";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform ${
        isOpen ? "w-64" : "w-16"
      } z-40`}
    >
      {/* Logo Section */}
      <div className="p-4 font-bold text-xl border-b border-gray-700">
        {isOpen ? "Admin Panel" : "C11"}
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-4">
        {/* Dashboard */}
        <a
          href="/dashboard"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiHome className="text-lg" />
          {isOpen && <span>Dashboard</span>}
        </a>

        {/* Our Clients */}
        <a
          href="/ourclients"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiUsers className="text-lg" />
          {isOpen && <span>Our Clients</span>}
        </a>

        {/* Job Openings */}
        <a
          href="/jobopenings"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiBriefcase className="text-lg" />
          {isOpen && <span>Job Openings</span>}
        </a>

        {/* Hire Developers */}
        <a
          href="/hiredevelopers"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiTool className="text-lg" />
          {isOpen && <span>Hire Developers</span>}
        </a>

        {/* Laptop Rental */}
        <a
          href="/laptoprental"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiMonitor className="text-lg" />
          {isOpen && <span>Laptop Rental</span>}
        </a>

        {/* Contact Us */}
        <a
          href="/contactus"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiPhone className="text-lg" />
          {isOpen && <span>Contact Us</span>}
        </a>

        {/* Coworking Space */}
        <a
          href="/coworkingspace"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiUsers className="text-lg" />
          {isOpen && <span>Coworking Space</span>}
        </a>

        {/* Services */}
        <a
          href="/services"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiSettings className="text-lg" />
          {isOpen && <span>Services</span>}
        </a>
        <a
          href="/profile"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiUser className="text-lg" />
          {isOpen && <span>Profile</span>}
        </a>
        <a
          href="/settings"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
        >
          <FiSettings className="text-lg" />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
