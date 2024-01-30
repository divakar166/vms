import React from 'react'

const DashboardContent = () => {
  return (
    <div className='m-1'>
      <div className='bg-stone-600 pl-5 rounded-lg h-40 flex justify-center flex-col'>
        <div className='text-4xl'>You are doing great </div>
        <div className='text-3xl font-bold'>Divakar!</div>
        <div className='text-lg'>Keep it up </div>
      </div>
      <div className='bg-slate-200 w-[450px] mt-1 pl-5 rounded-lg flex justify-center flex-col'>
        <div className='flex justify-between'>
          <div className='flex flex-col p-1'>
            <div className='font-bold text-3xl'>12</div>
            <div className='text-sm'>Total Orders</div>
          </div><hr />
          <div className='flex flex-col p-1'>
            <div className='font-bold text-3xl'>8</div>
            <div className='text-sm'>In Progress</div>
          </div><hr />
          <div className='flex flex-col p-1'>
            <div className='font-bold text-3xl'>3</div>
            <div className='text-sm'>Completed</div>
          </div><hr />
          <div className='flex flex-col p-1'>
            <div className='font-bold text-3xl'>1</div>
            <div className='text-sm'>Cancelled</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent