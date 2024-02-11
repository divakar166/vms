import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import ProfileContent from './ProfileContent';
import OrdersPage from './OrdersPage';

const HomePage = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className='flex '>
      <Sidebar onSidebarItemClick={handleSidebarItemClick} activeItem={activeItem} />
      <div className='ml-2 w-screen'>
        {activeItem === 'dashboard' && <DashboardContent />}
        {activeItem === 'orders' && <OrdersPage />}
        {activeItem === 'profile' && <ProfileContent />}
      </div>
    </div>
  )
}

export default HomePage;