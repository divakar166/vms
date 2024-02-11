import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from './utils.js';
import {
  PencilIcon
} from '@heroicons/react/24/outline';

const EditModal = ({ rowData, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(rowData.status);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSave = () => {
    onSave({ ...rowData, status });
    // Close modal or perform any other action after saving
    closeModal();
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button onClick={openModal} className="text-blue-500 hover:text-blue-700">
        <PencilIcon style={{width:'20px',height:'20px'}} />
      </button>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{rowData.po_number}</h3>
                <div className="mt-2">
                  <div className="mb-2">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Delivery Date</label>
                    <p id="quantity" className="mt-1 text-sm text-gray-900">{rowData.delivery_date}</p>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="items" className="block text-sm font-medium text-gray-700">Items</label>
                    <ul className="mt-1 text-sm text-gray-900">
                      {Object.keys(rowData.items).map((key, index) => (
                        <li key={index}>
                          <strong>{key}:</strong> {rowData.items[key]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <p id="quantity" className="mt-1 text-sm text-gray-900">{rowData.quantity}</p>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      id="status"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const OrdersPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const columns = useMemo(()=> COLUMNS,[])
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({
    columns,
    data:purchaseOrders,
  });
  const handleSave = (updatedData) => {
    const updatedOrders = purchaseOrders.map(order => {
      if (order._id === updatedData._id) {
        return { ...order, status: updatedData.status };
      } else {
        return order;
      }
    });
    setPurchaseOrders(updatedOrders);
  };
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
                    {cellIndex === columns.length - 1 && (
                      <EditModal rowData={row.original} onSave={handleSave} />
                    )}
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

export default OrdersPage
