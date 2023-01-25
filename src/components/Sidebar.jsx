import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SidebarButton from './ui/buttons/SidebarButton'

const Sidebar = () => {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    if (isAdmin == 1) {
      setAdmin(true)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav className='bg-gray-500 h-screen w-64'>
      <ul className='w-full space-y-5 flex flex-col bg-white/50 p-5'>
        {admin == false ? (
          <>
            <li className='flex'>
              <SidebarButton name='Dashboard' to='dashboard' />
            </li>
            <li className='flex'>
              <SidebarButton name='Calendar' to='calendar' />
            </li>
            <li className='flex'>
              <SidebarButton name='My Sweldo' to='my-sweldo' />
            </li>
            <li className='flex'>
              <SidebarButton name='Profile' to='profile' />
            </li>
          </>
        ) : (
          <>
            <li className='flex'>
              <SidebarButton name='Dashboard' to='dashboard' />
            </li>
          </>
        )}
        <li className='flex'>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
