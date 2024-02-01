import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = ({orderData}) => {
  const chartData = {
    labels: ['Total Orders'],
    datasets: [
      {
        label: 'Completed',
        data: [orderData.completed],
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
      {
        label: 'Pending',
        data: [orderData.pending],
        backgroundColor: 'rgba(255,99,132,0.4)',
      },
      {
        label: 'Cancelled',
        data: [orderData.cancelled],
        backgroundColor: 'rgba(255,206,86,0.4)',
      },
    ],
  };
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Order Information'
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <Bar data={chartData} options={chartOptions} />
  )
}

export default BarChart;