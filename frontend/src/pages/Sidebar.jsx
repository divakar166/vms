import React, { useState } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [active,setActive] = useState(false);
  const Icon = active ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon;
  return (
    <div 
      className={`grid min-h-screen ${active ? 'grid-cols-sidebar' : 'grid-cols-sidebar-collapsed'} transition-[grid-template-columns] duration-300 ease-in-out`}

    >
      <div className={`flex items-center border-b border-b-indigo-800 ${active ? 'p-4 justify-between' : 'py-4 justify-center'} `}>
        <div 
          onClick={()=>setActive(!active)}
          className='grid place-content-center hover:bg-indigo-800 w-10 h-10'
        >
          <Icon />
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Sidebar