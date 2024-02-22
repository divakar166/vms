import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { PerfColumn } from './utils.js';
// import {
//   PencilIcon
// } from '@heroicons/react/24/outline';
const Performance = () => {
  const [performances, setPerformances] = useState([]);
  const columns = useMemo(()=> PerfColumn,[])
  const [message,setMessage] = useState('');
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({
    columns,
    data:performances,
  });
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await fetch('http://localhost:5000/performance', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching performances');
        }
        const data = await response.json();
        if (data.length === 0){
          setMessage('No data found!')
        }
        setPerformances(data);
      } catch (error) {
        console.error('Error fetching performance:', error);
      }
    };
    fetchPerformance();
  }, []);
  return (
    <div className='my-1 mx-2'>
      <div className='text-2xl my-2'>
        Performance Metrics
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
        {message && (<tr><td colSpan={5} className='text-center text-lg'>{message}</td></tr>)}
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className={'px-6 py-4 whitespace-nowrap'
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

export default Performance