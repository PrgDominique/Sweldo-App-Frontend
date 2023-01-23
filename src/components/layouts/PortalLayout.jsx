import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const PortalLayout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default PortalLayout
