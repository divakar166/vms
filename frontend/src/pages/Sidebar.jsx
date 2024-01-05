import React, { useState } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, HomeIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [active,setActive] = useState(false);
  const Icon = active ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon;
  return (
    <div 
      className={`grid min-h-screen ${active ? 'grid-cols-sidebar' : 'grid-cols-sidebar-collapsed'} transition-[grid-template-columns] duration-300 ease-in-out`}
      style={{ boxShadow: '5px 0px 5px rgba(0, 0, 0, 0.1)',}}
    >
      <div className={`flex h-[70px] w-auto border-b border-b-indigo-800 ${active ? 'p-4 justify-between' : 'py-4 justify-center'} `}>
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
      <div className=''>
        <div>
          <div>
            <HomeIcon style={{color:'#000',width:'30px',height:'30px'}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar