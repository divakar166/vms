import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import ProfileContent from './ProfileContent';
import SettingsContent from './SettingsContent';
import OrdersPage from './OrdersPage';

const HomePage = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className='flex '>
      <Sidebar onSidebarItemClick={handleSidebarItemClick} activeItem={activeItem} />
      <div className='ml-5 w-screen'>
        {activeItem === 'dashboard' && <DashboardContent />}
        {activeItem === 'orders' && <OrdersPage />}
        {activeItem === 'profile' && <ProfileContent />}
        {activeItem === 'settings' && <SettingsContent />}
      </div>
    </div>
  )
}

export default HomePage;