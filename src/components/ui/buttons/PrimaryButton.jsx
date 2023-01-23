import { NavLink } from 'react-router-dom'

const PrimaryButton = ({ name, to }) => {
  return (
    <NavLink
      to={to}
      className='bg-blue-600 text-white font-medium px-5 py-2.5 rounded hover:bg-blue-700'
    >
      {name}
    </NavLink>
  )
}

export default PrimaryButton