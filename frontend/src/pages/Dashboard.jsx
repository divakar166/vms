import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    
    <div className='flex '>
      <Sidebar />
      <div className='ml-5'>Main component</div>
    </div>
  )
}

export default Dashboard