import React, { useState } from "react";
import { Bell, User, LogOut, MoonStar, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 md:px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm h-16">
      <div className="flex items-center">{children}</div>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center justify-center w-10 h-10 rounded bg-transparent border-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100 transition"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <MoonStar size={20} />}
        </button>

        <button
          className="flex items-center justify-center w-10 h-10 rounded bg-transparent border-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100 transition"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="relative">
          <button
            className="flex items-center justify-center p-0 bg-none border-none cursor-pointer"
            onClick={toggleDropdown}
            aria-label="User menu"
          >
            <img
              src={user?.avatarUrl}
              alt={user?.name}
              className="w-[38px] h-[38px] rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 hover:border-primary transition-colors"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-[calc(100%+10px)] right-0 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-md overflow-hidden z-10 animate-fadeIn">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition">
                <User size={16} />
                <span>Profile</span>
              </button>

              <button
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
