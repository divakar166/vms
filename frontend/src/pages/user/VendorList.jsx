import { useState, useEffect } from "react";
import axios from 'axios';

const VendorList = () => {
  const [data,setData] = useState([]);
  useEffect(()=>{
    axios.get('http://192.168.60.192:5000/api/vendors')
    .then(response=>{
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data: ',error);
    })
  },[]);
  return (
    <>
      <div className='text-2xl text-blue-700'>VendorList</div>
      <ul>
        {data.map(item =>(
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

export default VendorList