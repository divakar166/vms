import React, { useState, useEffect } from 'react';
import growth from './growth.svg';
import BarChart from './charts/BarChart';
import RadarChart from './charts/RadarChart';

const DashboardContent = () => {
  const [metricsData, setMetricsData] = useState({
    on_time_delivery_rate: 0,
    quality_rating_avg: 0,
    average_response_time: 0,
    fulfillment_rate: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/vendors/VN001/performance',{
          method:"GET",
          headers:{
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setMetricsData([
          data.on_time_delivery_rate,
          data.quality_rating_avg,
          data.average_response_time,
          data.fulfillment_rate
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
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
      <div className='flex mt-4'>
        <div className='bg-slate-100 w-[450px] mr-5 px-5 py-1 rounded-lg flex justify-center flex-col'>
          <RadarChart data={metricsData} />
        </div>
        <div className='bg-slate-100 w-[450px] px-5 py-1 rounded-lg flex justify-center flex-col'>
          <BarChart orderData={{total:12,completed:3,pending:8,cancelled:1}} />
        </div>
      </div>
    </div>
  )
}

export default DashboardContent