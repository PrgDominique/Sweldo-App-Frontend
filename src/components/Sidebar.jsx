import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarButton from './ui/buttons/SidebarButton'
import SubmitButton from './ui/buttons/SubmitButton'

const Sidebar = ({ activeSidebar }) => {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    if (isAdmin === '1') {
      setAdmin(true)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <aside
      className={
        activeSidebar
          ? 'w-64 flex flex-col transition-all duration-300'
          : 'w-64 flex flex-col transition-all duration-300 -ml-64'
      }
    >
      <div className='bg-blue-600 h-64 flex justify-center items-center p-5'>
        <p>Welcome Jason</p>
      </div>
      <nav className='bg-black/50 flex-1'>
        <ul className='flex flex-col space-y-5 p-5'>
          {admin === false ? (
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
            <button
              className='w-full flex space-x-5 text-black font-medium px-5 py-2.5 rounded hover:bg-blue-600 hover:text-white'
              onClick={logout}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                />
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
