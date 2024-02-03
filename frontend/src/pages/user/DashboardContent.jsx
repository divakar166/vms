import React, { useState, useEffect } from 'react';
import growth from './growth.svg';
import BarChart from './charts/BarChart';
import RadarChart from './charts/RadarChart';

const DashboardContent = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/auth/vendor', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);
  return (
    <div className='m-1'>
      <div className='bg-blue-100 pl-5 rounded-lg h-40 flex justify-between'>
        <div className='mt-6'>
          <div className='text-4xl'>You are doing great </div>
          <div className='text-3xl font-bold text-blue-500'>{user && user.name}!</div>
          <div className='text-lg'>Keep it up </div>
        </div>
        <div><img src={growth} className='h-[150px] mr-10' alt="" /></div>
      </div>
      <div className='flex mt-4'>
        <div className='bg-slate-100 w-[450px] mr-5 px-5 py-1 rounded-lg flex justify-center flex-col'>
          <RadarChart />
        </div>
        <div className='bg-slate-100 w-[450px] px-5 py-1 rounded-lg flex justify-center flex-col'>
          <BarChart orderData={{total:12,completed:3,pending:8,cancelled:1}} />
        </div>
      </div>
    </div>
  )
}

export default DashboardContent