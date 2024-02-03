import React, { useState, useEffect } from 'react';

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
      
    </div>
  )
}

export default OrdersPage