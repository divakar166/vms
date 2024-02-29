import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useEffect,useState } from 'react';

const BarChart = ({vendorCode}) => {
  const [orderCounts, setOrderCounts] = useState({
    completed: 0,
    pending: 0,
    cancelled: 0,
  });
  useEffect(() => {
    fetch(`http://localhost:5000/orders/${vendorCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // const completedCount = data.filter(order => order.status === 'completed').length;
      // const pendingCount = data.filter(order => order.status === 'pending').length;
      // const cancelledCount = data.filter(order => order.status === 'cancelled').length;
      // setOrderCounts({
      //   completed: completedCount,
      //   pending: pendingCount,
      //   cancelled: cancelledCount,
      // });
    })
    .catch(error => console.error('Error fetching orders:', error));
  }, [vendorCode]);

  const chartData = {
    labels: ['Total Orders'],
    datasets: [
      {
        label: 'Completed',
        data: [orderCounts.completed],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
      },
      {
        label: 'Pending',
        data: [orderCounts.pending],
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
      },
      {
        label: 'Cancelled',
        data: [orderCounts.cancelled],
        backgroundColor: 'rgba(255, 206, 86, 0.4)',
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