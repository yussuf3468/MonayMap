import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import './Settings.css';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="settings-page fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="settings-grid">
        <Card className="profile-settings slide-in-up">
          <h2 className="section-title">Profile</h2>
          
          <div className="profile-info">
            <div className="profile-avatar">
              <img
                src={user?.avatarUrl}
                alt={user?.name}
                className="avatar-img large"
              />
            </div>
            
            <div className="profile-details">
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  defaultValue={user?.name}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  defaultValue={user?.email}
                  disabled
                />
              </div>
            </div>
          </div>
          
          <div className="section-divider"></div>
          
          <div className="form-group">
            <label htmlFor="currency">Default Currency</label>
            <select id="currency" className="form-select">
              <option value="usd">USD - US Dollar</option>
              <option value="eur">EUR - Euro</option>
              <option value="gbp">GBP - British Pound</option>
              <option value="jpy">JPY - Japanese Yen</option>
              <option value="cad">CAD - Canadian Dollar</option>
            </select>
          </div>
          
          <Button variant="primary" size="md" className="save-btn">
            Save Changes
          </Button>
        </Card>
        
        <Card className="app-settings slide-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="section-title">App Settings</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-title">Theme</h3>
              <p className="setting-description">Toggle between light and dark mode</p>
            </div>
            <div className="theme-toggle">
              <button
                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => theme === 'dark' && toggleTheme()}
              >
                Light
              </button>
              <button
                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => theme === 'light' && toggleTheme()}
              >
                Dark
              </button>
            </div>
          </div>
          
          <div className="section-divider"></div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-title">Notifications</h3>
              <p className="setting-description">Manage your email notifications</p>
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="section-divider"></div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-title">Budget Alerts</h3>
              <p className="setting-description">Receive alerts when you're close to budget limits</p>
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="section-divider"></div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-title">Data Export</h3>
              <p className="setting-description">Export your financial data</p>
            </div>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
          </div>
        </Card>
        
        <Card className="security-settings slide-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">Security</h2>
          
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              className="form-input"
              placeholder="Enter current password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              className="form-input"
              placeholder="Enter new password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              className="form-input"
              placeholder="Confirm new password"
            />
          </div>
          
          <Button variant="primary" size="md" className="save-btn">
            Update Password
          </Button>
          
          <div className="section-divider"></div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3 className="setting-title">Two-Factor Authentication</h3>
              <p className="setting-description">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;