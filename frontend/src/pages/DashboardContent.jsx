import React from 'react';
import growth from '../images/growth.svg';

const DashboardContent = () => {
  return (
    <div className='m-1'>
      <div className='bg-blue-100 pl-5 rounded-lg h-40 flex justify-between'>
        <div className='mt-6'>
          <div className='text-4xl'>You are doing great </div>
          <div className='text-3xl font-bold text-blue-500'>Divakar!</div>
          <div className='text-lg'>Keep it up </div>
        </div>
        <div><img src={growth} className='h-[150px] mr-10' alt="" /></div>
      </div>
      <div className='bg-slate-200 w-[450px] mt-1 px-5 py-1 rounded-lg flex justify-center flex-col'>
        <div className='flex justify-between'>
          <div className='order-item'>
            <div className='item'>12</div>
            <div className='item-sub text-slate-600'>Total Orders</div>
          </div> 
          <span className='h-14 mt-[10px] border-l-2 border-slate-300' />
          <div className='order-item'>
            <div className='item'>8</div>
            <div className='item-sub text-slate-600'>In Progress</div>
          </div> 
          <span className='h-14 mt-[10px] border-l-2 border-slate-300' />
          <div className='order-item'>
            <div className='item'>3</div>
            <div className='item-sub text-slate-600'>Completed</div>
          </div>
          <span className='h-14 mt-[10px] border-l-2 border-slate-300' />
          <div className='order-item'>
            <div className='item'>1</div>
            <div className='item-sub text-slate-600'>Cancelled</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent