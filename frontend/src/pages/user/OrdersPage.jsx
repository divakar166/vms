import React, { useState, useEffect, useMemo } from 'react';
// import { useTable } from 'react-table';
// import { COLUMNS } from './utils';
const OrdersPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/purchase-orders', {
          method: 'GET',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching purchase orders');
        }

        const data = await response.json();
        console.log(data)
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      }
    };

    fetchPurchaseOrders();
  }, []);
  return (
    <div className='bg-slate-300 m-1'>
       <table>
      <thead>
        <tr>
          <th>PO Number</th>
          <th>Order Date</th>
          <th>Quantity</th>
          <th>Delivery Date</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>
        {purchaseOrders.map((order) => (
          <tr key={order._id}>
            <td>{order.po_number}</td>
            <td>{new Date(order.order_date).toLocaleDateString()}</td>
            <td>{order.quantity}</td>
            <td>{new Date(order.delivery_date).toLocaleDateString()}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default OrdersPage
