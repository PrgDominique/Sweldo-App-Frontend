import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'

const PortalLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
      return
    }
  }, [])

  return (
    <div className='flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default PortalLayout
