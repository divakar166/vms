import {
  PencilIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
export const COLUMNS = (openModal,setRowData) => [
  {
    Header:'PO Number',
    accessor:'po_number',
  },
  {
    Header:'Order Date',
    accessor:'order_date',
  },
  {
    Header:'Quantity',
    accessor:'quantity',
  },
  {
    Header:'Delivery Date',
    accessor:'delivery_date',
  },
  {
    Header:'Status',
    accessor:'status',
  },
  {
    Header:'Edit',
    accessor:'edit',
    Cell: ({ row }) => {
      const { status } = row.original;
      return (
        <div>
          {status === 'pending' ? (
            <PencilIcon 
              onClick={()=>{openModal();setRowData(row.original)}} 
              style={{width:'20px',height:'20px'}} 
              className='hover:text-blue-500 cursor-pointer'
            />
          ) : (
            <p>
              <EyeIcon 
                onClick={()=>{openModal();setRowData(row.original)}} 
                style={{width:'20px',height:'20px'}} 
                className='hover:text-blue-500 cursor-pointer'
              />
            </p>
          )}
        </div>
      );
    },
  },
];
