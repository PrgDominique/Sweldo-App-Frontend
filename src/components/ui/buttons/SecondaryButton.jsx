import { NavLink } from 'react-router-dom'

const SecondaryButton = ({ name, to }) => {
  return (
    <NavLink
      to={to}
      className='text-black font-medium px-5 py-2.5 rounded hover:bg-black/50 hover:text-white'
    >
      {name}
    </NavLink>
  )
}

export default SecondaryButton