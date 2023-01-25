import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import PortalNavbar from '../PortalNavbar'

const UserLayout = () => {
  const navigate = useNavigate()
  const [activeSidebar, setActiveSidebar] = useState(true)

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    const token = localStorage.getItem('token')
    if (!token || !isAdmin) {
      navigate('/')
      return
    }
    if (isAdmin === '1') {
      navigate('/admin/dashboard')
      return
    }
    // eslint-disable-next-line
  }, [])

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar)
  }

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar activeSidebar={activeSidebar} toggleSidebar={toggleSidebar} />

      {/* Right side */}
      <div
        className={
          activeSidebar
            ? 'w-full transition-all duration-300 ml-64'
            : 'w-full transition-all duration-300'
        }
      >
        {/* Navbar */}
        <PortalNavbar
          activeSidebar={activeSidebar}
          toggleSidebar={toggleSidebar}
        />

        {/* Content */}
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserLayout
