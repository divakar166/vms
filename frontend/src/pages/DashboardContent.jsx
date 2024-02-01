import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import growth from '../images/growth.svg';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
  const chartData = {
    labels: ['Time Delivery Rate','Quality Rating','Average Response Time','Fulfillment Rate'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: Object.values(metricsData),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };
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
        <div className='bg-slate-200 w-[450px] mr-5 px-5 py-1 rounded-lg flex justify-center flex-col'>
          <Radar data={chartData} options={chartOptions} />
        </div>
        <div className='bg-slate-200 w-[450px] px-5 py-1 rounded-lg flex justify-center flex-col'>
          {/* <Radar data={chartData} options={chartOptions} /> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardContent