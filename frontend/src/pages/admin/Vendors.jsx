import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { VendorColumns } from './utils.js';
import {
  PencilIcon
} from '@heroicons/react/24/outline';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const columns = useMemo(()=> VendorColumns,[])
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({
    columns,
    data:vendors,
  });
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:5000/vendors', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching vendors');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);
  return (
    <div className='my-1 mx-2'>
      <div className='flex justify-between items-center'>
        <div className='text-2xl my-2'>
          Vendors
        </div>
        <div className='text-lg py-1 mr-2 px-2 cursor-pointer text-white bg-blue-500 rounded-lg'>
          Requests
          <span className='absolute text-center leading-4 top-1 right-3 bg-red-500 rounded-full text-sm h-4 w-4'>0</span>
        </div>
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
                  <td className={`px-6 py-4 whitespace-nowrap`
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

export default Vendors