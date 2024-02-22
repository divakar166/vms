import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { OrdersColumn } from './utils.js';
import {
  PlusIcon,
} from '@heroicons/react/24/outline';

const AddNewPOModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSave = (e) => {
    let po = e.target.po.value;
    let vendor = e.target.vendor.value;
    let delivery_date = e.target.delivery_date.value;
    let items = e.target.items.value;
    let quantity = e.target.quantity.value;
    console.log(po,vendor,delivery_date,items,quantity)
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
      <button onClick={openModal} className="text-white bg-blue-500 p-2 rounded-lg flex items-center">
        <PlusIcon style={{width:'20px',height:'20px'}} /> Add New PO
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
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Purchase Order</h3>
                <form onSubmit={handleSave}>
                  <div className="mt-2">
                    <div className="mb-2">
                      <label htmlFor="po">PO No.: </label>
                      <input type="text" name='po' className='font-medium' disabled value="PO001" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="vendor">Assign to : </label>
                      <select name="vendor" id="vendor">
                        <option value="0">Select Vendor</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="delivery_date">Delivery Date: </label>
                      <input type="date" name="delivery_date" id="delivery_date" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="items">Items: </label>
                      <input type="text" name='items' value="" className='border-[1px] rounded-md border-black pl-1' placeholder='Items in JSON' />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="quantity">Quantity: </label>
                      <input type="text" name='quantity' className='border-[1px] rounded-md border-black pl-1' placeholder='Quantity' />
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type='submit'
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add PO
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const columns = useMemo(()=> OrdersColumn,[])
  const [message,setMessage] = useState('');
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({
    columns,
    data:orders,
  });
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
        console.error('Error fetching vendors:', error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className='my-1 mx-2'>
      <div className='flex justify-between items-center mb-2'>
        <div className='text-2xl my-2'>
          Purchase Orders
        </div>
        <AddNewPOModal />
        {/* <div className='p-2 flex border-2 border-blue-500 rounded-lg bg-blue-500 text-white cursor-pointer'>
          <PlusIcon className='w-6 h-6' />
          Add New PO
        </div> */}
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
                    {cellIndex === columns.length - 1 && 'Edit'}
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