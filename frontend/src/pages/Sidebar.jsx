import React, { useState } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, HomeIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [active,setActive] = useState(false);
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
          className='grid place-content-center cursor-pointer bg-slate-200 rounded-xl w-10 h-10'
        >
          <Icon style={{color:'#000',height:'30px',width:'30px'}} />
        </div>
      </div>
      <div className='p-2 flex-grow'>
        <div className={`p-2 flex cursor-pointer`}>
          <div className='grid place-content-center cursor-pointer bg-slate-200 w-10 h-10 rounded-xl'>
            <HomeIcon style={{color:'#000',width:'30px',height:'30px'}} />
          </div>
          {active && (
            <div className='center hover:scale-110 w-full font-semibold'>Dashboard</div>
          )}
        </div>
      </div>
      <div className='p-2'>
        <div className={`p-2 flex cursor-pointer`}>
          <div className='grid place-content-center cursor-pointer bg-slate-200 w-10 h-10 rounded-xl'>
            <ArrowLeftStartOnRectangleIcon style={{color:'#000',width:'30px',height:'30px'}} />
          </div>
          {active && (
            <div className='center hover:scale-110 w-full font-semibold'>Logout</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar