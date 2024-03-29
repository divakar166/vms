import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { AdminOrdersColumn } from './utils.js';
import AddNewPOModal from './modals/AddNewPOModal.jsx';

const Orders = () => {  
  const [orders, setOrders] = useState([]);
  const columns = useMemo(()=> AdminOrdersColumn,[])
  const [message,setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({
    columns,
    data:orders,
  });
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/pos', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching vendors');
        }
        const data = await response.json();
        const formattedData = await Promise.all(data.map(async order => {
          const vendorResponse = await fetch(`http://localhost:5000/vendors/${order.vendor}`);
          if (!vendorResponse.ok) {
            throw new Error('Error fetching vendor details');
          }
          const vendorData = await vendorResponse.json();
          return {
            ...order,
            order_date: new Date(order.order_date).toLocaleDateString(),
            delivery_date: new Date(order.delivery_date).toLocaleDateString(),
            vendor: vendorData.vendorCode,
          };
        }));
        if(data.length === 0){
          setMessage('No data found!')
        }
        setOrders(formattedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='my-1 mx-2'>
      <div className='flex justify-between items-center mb-2'>
        <div className='text-2xl my-2'>
          Purchase Orders
        </div>
        <button onClick={openModal} className="text-white bg-blue-500 p-2 rounded-lg flex items-center">
          Add New PO
        </button>
      </div>
      <AddNewPOModal isOpen={isModalOpen} onClose={closeModal} />
      <table className='min-w-full divide-y divide-gray-200' {...getTableProps()}>
        <thead className='bg-gray-50'>
          {headerGroups.map((headerGroup)=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column)=>(
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200' {...getTableBodyProps()}>
        {message && (<tr><td colSpan={6} className='text-center text-lg'>{message}</td></tr>)}
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td className={`px-6 py-4 whitespace-nowrap ${
                    cell.value === 'pending' ? 'text-yellow-500' :
                    cell.value === 'completed' ? 'text-green-500' :
                    cell.value === 'cancelled' ? 'text-red-500' : ''}`
                  } {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Orders