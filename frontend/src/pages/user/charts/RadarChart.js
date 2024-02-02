import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const RadarChart = () => {
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
    <Radar data={chartData} options={chartOptions} />
  )
}

export default RadarChart