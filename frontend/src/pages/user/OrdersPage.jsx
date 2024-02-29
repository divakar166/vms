import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from './utils.js';
import EditOrderModal from './modals/EditOrderModal'

const OrdersPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [rowData, setRowData] = useState({});
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSave = () => {
    closeModal();
    fetchPurchaseOrders();
  };
  const columns = useMemo(()=> COLUMNS(openModal,setRowData),[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({
    columns,
    data:purchaseOrders,
  });
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
      const formattedData = data.map(order => ({
        ...order,
        order_date: new Date(order.order_date).toLocaleDateString(),
        delivery_date: new Date(order.delivery_date).toLocaleDateString(),
      }));
      setPurchaseOrders(formattedData);
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };
  useEffect(() => {
    fetchPurchaseOrders();
  }, []);
  return (
    <div className='my-1 mx-2'>
      <div className='text-2xl my-2'>
        Puchase Orders
      </div>
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
      <EditOrderModal isOpen={isModalOpen} onClose={closeModal} rowData={rowData} onSave={handleSave} />
    </div>
  )
}

export default OrdersPage
