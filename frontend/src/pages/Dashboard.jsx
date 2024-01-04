import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <div className='flex '>
      <Sidebar />
      <div>Main component</div>
    </div>
  )
}

export default Dashboard