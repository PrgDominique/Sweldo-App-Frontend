import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'

const AdminLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    const token = localStorage.getItem('token')
    if (!token || !isAdmin) {
      navigate('/')
      return
    }
    if (isAdmin === '0') {
      navigate('/dashboard')
      return
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
