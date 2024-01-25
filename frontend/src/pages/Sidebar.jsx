import React, { useState } from 'react';
import { 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon, 
  HomeIcon, 
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const SidebarItem = ({ label, icon, onClick, sidebarActive,isActive }) => {
  return (
    <div
      className={`sidebar-item my-1 ${isActive ? 'active' : ''} p-2 flex hover:bg-slate-300 rounded-lg cursor-pointer`}
      onClick={onClick}
    >
      <div className='grid place-content-center cursor-pointer w-10 h-10 rounded-xl'>
        {icon}
      </div>
      {sidebarActive && 
      <div className="center w-full text-[18px] font-semibold">
        {label}
      </div>}
    </div>
  );
};

const Sidebar = ({onSidebarItemClick, activeItem}) => {
  const [active,setActive] = useState(false);
  const sidebarItems = [
    { id: 1, label: 'Dashboard',key:'dashboard', icon:<HomeIcon style={{color:'#000',width:'30px',height:'30px'}} />},
    { id: 2, label: 'Profile',key:'profile',icon:<UserIcon style={{color:'#000',width:'30px',height:'30px'}} />},
    { id: 3, label: 'Settings',key:'settings',icon:<Cog6ToothIcon style={{color:'#000',width:'30px',height:'30px'}} />},
  ];
  const Icon = active ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon;
  return (
    <div 
      className={`flex flex-col min-h-screen ${active ? 'sidebar-collapsed' : 'sidebar'} transition ease-in-out delay-150`}
      style={{ boxShadow: '5px 0px 5px rgba(0, 0, 0, 0.1)',}}
    >
      <div className={`flex h-[70px] w-auto border-b border-b-indigo-800 ${active ? 'p-4 justify-around' : 'py-4 justify-center'} `}>
        {active && (
          <div className='w-auto h-10 flex justify-center items-center pl-2 text-2xl'>Divakar</div>
        )}
        <div 
          onClick={()=>setActive(!active)}
          className='grid place-content-center cursor-pointer hover:bg-slate-200 rounded-xl w-10 h-10'
        >
          <Icon style={{color:'#000',height:'30px',width:'30px'}} />
        </div>
      </div>
      <div className='p-2 flex-grow'>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            sidebarActive={active}
            onClick={() => onSidebarItemClick(item.key)}
            isActive={item.key === activeItem}
          />
        ))}
      </div>
      <div className='p-2'>
        <div className={`p-2 flex hover:bg-slate-300 rounded-lg cursor-pointer`}>
          <div className='grid  place-content-center cursor-pointer w-10 h-10 rounded-xl'>
            <ArrowLeftStartOnRectangleIcon style={{color:'#000',width:'30px',height:'30px'}} />
          </div>
          {active && (
            <div className='center text-[18px] w-full font-semibold'>Logout</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar