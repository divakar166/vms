import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { RequestsColumns } from './utils.js';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const columns = useMemo(() => RequestsColumns, []);
  const [message, setMessage] = useState('');
  const [dataMessage,setDataMessage] = useState('');
  
  const acceptVendorRequest = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:5000/vendorsReq/${vendorId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMessage('Vendor request accepted successfully');
        setTimeout(fetchRequests, 1000);
      } else {
        throw new Error('Error accepting vendor request');
      }
    } catch (error) {
      console.error('Error accepting vendor request:', error);
    }
  };

  const rejectVendorRequest = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:5000/vendorsReq/${vendorId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMessage('Vendor request rejected successfully');
        setTimeout(fetchRequests, 1000);
      } else {
        throw new Error('Error rejecting vendor request');
      }
    } catch (error) {
      console.error('Error rejecting vendor request:', error);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: requests,
  });

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/vendorsReq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching vendor requests');
      }
      const data = await response.json();
      if (data.length === 0) {
        setDataMessage('No data found!');
      }
      setRequests(data);
    } catch (error) {
      console.error('Error fetching vendor requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className='my-1 mx-2'>
      <div className='text-2xl my-2'>
        Vendor Requests
      </div>
      {message && <div className="text-green-500">{message}</div>}
      <table className='min-w-full divide-y divide-gray-200' {...getTableProps()}>
        <thead className='bg-gray-50'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200' {...getTableBodyProps()}>
          {dataMessage && (<tr className='text-center'><td colSpan={4}>{dataMessage}</td></tr>)}
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td className={'px-6 py-4 whitespace-nowrap'} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                    {cellIndex === columns.length - 1 && (
                      <div className='flex'>
                        <div
                          className='px-2 py-1 border-green-400 border-2 rounded-lg bg-green-300 text-slate-700 mr-2 cursor-pointer hover:text-green-500'
                          onClick={() => acceptVendorRequest(row.original._id)}
                        >
                          Accept
                        </div>
                        <div
                          className='px-2 py-1 border-red-400 border-2 rounded-lg bg-red-300 text-slate-700 cursor-pointer hover:text-red-500'
                          onClick={() => rejectVendorRequest(row.original._id)}
                        >
                          Reject
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
