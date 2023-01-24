import { NavLink } from 'react-router-dom'

const SidebarButton = ({ name, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'w-full bg-blue-600 text-white font-medium px-5 py-2.5 rounded'
          : 'w-full hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded'
      }
    >
      {name}
    </NavLink>
  )
}

export default SidebarButton
