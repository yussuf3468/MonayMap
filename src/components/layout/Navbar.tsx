import React from 'react';
import { Bell, User, LogOut, MoonStar, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-start">
        {children}
      </div>
      
      <div className="navbar-end">
        <button 
          className="navbar-icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <MoonStar size={20} />}
        </button>
        
        <button className="navbar-icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>
        
        <div className="avatar-dropdown">
          <button 
            className="avatar-btn" 
            onClick={toggleDropdown}
            aria-label="User menu"
          >
            <img 
              src={user?.avatarUrl} 
              alt={user?.name} 
              className="avatar-img" 
            />
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <p className="user-name">{user?.name}</p>
                <p className="user-email">{user?.email}</p>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item">
                <User size={16} />
                <span>Profile</span>
              </button>
              
              <button className="dropdown-item" onClick={logout}>
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