import React, { useState } from 'react';
import { Sidebar, Vendors, Orders, Performance } from './index';

const AdminHomePage = () => {
  const [activeItem, setActiveItem] = useState('vendors');
  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className='flex '>
      <Sidebar onSidebarItemClick={handleSidebarItemClick} activeItem={activeItem} />
      <div className='ml-2 w-screen'>
        {activeItem === 'vendors' && <Vendors />}
        {activeItem === 'orders' && <Orders />}
        {activeItem === 'performance' && <Performance />}
      </div>
    </div>
  )
}

export default AdminHomePage;