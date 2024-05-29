import React from 'react'
import Sidebar from '../components/Sidebar'
import Topcard from '../components/Topcard';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Topcard title="collections" value={100} />
          <Topcard title="Sign-ups" value={200} />
          <Topcard title="Total Revenue" value={3000} />
          <Topcard title="Bounced cheques" value={5} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
