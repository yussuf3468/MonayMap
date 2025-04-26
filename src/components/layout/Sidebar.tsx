import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, PieChart, Settings, MapPin } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <MapPin size={24} className="logo-icon" />
          {!collapsed && <h1 className="logo-text">MoneyMap</h1>}
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" end>
              <LayoutDashboard size={20} className="nav-icon" />
              {!collapsed && <span className="nav-text">Dashboard</span>}
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/transactions" className="nav-link">
              <Receipt size={20} className="nav-icon" />
              {!collapsed && <span className="nav-text">Transactions</span>}
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/goals" className="nav-link">
              <Wallet size={20} className="nav-icon" />
              {!collapsed && <span className="nav-text">Goals</span>}
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/analytics" className="nav-link">
              <PieChart size={20} className="nav-icon" />
              {!collapsed && <span className="nav-text">Analytics</span>}
            </NavLink>
          </li>
          
          <li className="nav-item settings">
            <NavLink to="/settings" className="nav-link">
              <Settings size={20} className="nav-icon" />
              {!collapsed && <span className="nav-text">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;