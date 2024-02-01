import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const RadarChart = ({data}) => {
  const chartData = {
    labels: ['Time Delivery Rate','Quality Rating','Average Response Time','Fulfillment Rate'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: Object.values(data),
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