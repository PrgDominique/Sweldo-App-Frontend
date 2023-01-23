import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className='p-5 bg-gray-500 h-screen'>
      <div>
        <ul className='space-y-5'>
          <li>
            <NavLink
              to='dashboard'
              className='bg-blue-700 hover:bg-blue-500 text-white px-4 py-2'
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to='course' className='px-4 py-2'>
              Course
            </NavLink>
          </li>
          <li>
            <NavLink to='batch' className='px-4 py-2'>
              Batch
            </NavLink>
          </li>
          <li>
            <NavLink to='user' className='px-4 py-2'>
              User
            </NavLink>
          </li>
          <li>
            <NavLink to='settings' className='px-4 py-2'>
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar
