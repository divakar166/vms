import React, { useState } from 'react';
import { 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon, 
  HomeIcon, 
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const SidebarItem = ({ label, icon, onClick,isActive }) => {
  return (
    <div
      className={`sidebar-item my-1 ${isActive ? 'active' : ''} px-2 py-1 flex hover:bg-blue-500  rounded-2xl cursor-pointer`}
      onClick={onClick}
    >
      <div className={`${isActive?'text-white':''} icon grid place-content-center text-slate-500 cursor-pointer w-10 h-10 rounded-xl`}>
        {icon}
      </div>
      <div className={`${isActive?'text-white':''} label center w-full text-black font-semibold`}>
        {label}
      </div>
    </div>
  );
};

const Sidebar = ({onSidebarItemClick, activeItem}) => {
  const sidebarItems = [
    { id: 1, label: 'Dashboard',key:'dashboard', icon:<HomeIcon style={{width:'25px',height:'25px'}} />},
    { id: 2, label: 'Profile',key:'profile',icon:<UserIcon style={{width:'25px',height:'25px'}} />},
    { id: 3, label: 'Settings',key:'settings',icon:<Cog6ToothIcon style={{width:'25px',height:'25px'}} />},
  ];
  return (
    <div 
      className={`flex flex-col min-h-screen sidebar transition ease-in-out delay-150`}
      style={{ boxShadow: '5px 0px 5px rgba(0, 0, 0, 0.1)',}}
    >
      <div className={`flex h-[70px] w-auto `}>
        <div className='w-auto h-10 flex justify-center items-center pl-2 text-2xl'>Divakar</div>
      </div>
      <div className='p-2 flex-grow'>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            onClick={() => onSidebarItemClick(item.key)}
            isActive={item.key === activeItem}
          />
        ))}
      </div>
      <div className='p-2'>
        <div className={`p-2 flex hover:bg-blue-500 sidebar-item rounded-lg cursor-pointer`}>
          <div className='grid icon place-content-center text-slate-500 cursor-pointer w-10 h-10 rounded-xl'>
            <ArrowLeftStartOnRectangleIcon style={{width:'25px',height:'25px'}} />
          </div>
          <div className='center label w-full text-black font-semibold'>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar