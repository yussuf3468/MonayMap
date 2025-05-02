import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Menu as MenuFold, Menu as MenuUnfold } from 'lucide-react';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`flex h-screen overflow-hidden flex-col md:flex-row`}>
      <div className={`fixed bottom-0 w-full h-auto z-[100] md:static md:w-auto md:h-full`}>
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      <div
        className={`flex flex-col flex-1 overflow-hidden transition-[margin-left] duration-300 ease-in-out mb-[60px] md:mb-0`}
      >
        <Navbar>
          <button
            className="hidden md:flex items-center justify-center w-9 h-9 bg-transparent border-none text-gray-600 dark:text-gray-300 cursor-pointer rounded transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <MenuUnfold size={20} /> : <MenuFold size={20} />}
          </button>
        </Navbar>
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
