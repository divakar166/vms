import React, { useState, useEffect } from 'react';
import {
  UserGroupIcon, 
  ArrowLeftStartOnRectangleIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const SidebarItem = ({ label, icon, onClick,isActive }) => {
  const [requests,setRequests] = useState([])
  useEffect(()=>{
    const fetchVendorReq = async () => {
      try {
        const response = await fetch('http://localhost:5000/vendorsReq', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching vendors');
        }
        const data = await response.json();
        setRequests(data.length)
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    }
    fetchVendorReq();
  })
  return (
    <div
      className={`sidebar-item my-1 ${isActive ? 'active' : ''} px-2 py-1 flex hover:bg-blue-500 rounded-2xl cursor-pointer`}
      onClick={onClick}
    >
      <div className={`${isActive?'text-white':''} icon grid place-content-center text-slate-500 cursor-pointer w-10 h-10 rounded-xl`}>
        {icon}
      </div>
      <div className={`${isActive?'text-white':''} label center w-full text-black font-semibold`}>
        {label}
      </div>
      <div className='flex justify-center items-center'>
        {label == 'Requests' && (<span className='text-center text-white leading-6 bg-red-500 rounded-full text-sm h-6 w-6'>{requests}</span>)}
      </div>
    </div>
  );
};

const Sidebar = ({onSidebarItemClick, activeItem}) => {
  const handleLogoutAction = (e) => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  }
  const sidebarItems = [
    { id: 1, label: 'Vendors',key:'vendors', icon:<UserGroupIcon style={{width:'25px',height:'25px'}} />},
    { id: 2, label: 'Orders',key:'orders',icon:<ClipboardDocumentCheckIcon style={{width:'25px',height:'25px'}} />},
    { id: 3, label: 'Performance',key:'performance',icon:<ChartBarIcon style={{width:'25px',height:'25px'}} />},
    { id: 4, label: 'Requests',key:'requests',icon:<UserPlusIcon style={{width:'25px',height:'25px'}} />},
  ];
  return (
    <div 
      className={`flex flex-col min-h-screen sidebar transition ease-in-out delay-150`}
      style={{ boxShadow: '5px 0px 5px rgba(0, 0, 0, 0.1)',}}
    >
      <div className={`flex h-[70px] center w-auto `}>
        <div className='w-auto h-10 flex justify-center text-cyan-500 items-center pl-2 text-[40px]'>vms.</div>
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
        <div className={`px-2 py-1 flex hover:bg-blue-500 sidebar-item rounded-2xl cursor-pointer`} onClick={handleLogoutAction}>
          <div className='grid icon place-content-center text-slate-500 cursor-pointer w-10 h-10'>
            <ArrowLeftStartOnRectangleIcon style={{width:'25px',height:'25px'}} />
          </div>
          <div className='center label w-full text-black font-semibold'>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;