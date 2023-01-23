import { NavLink } from 'react-router-dom'
import PrimaryButton from './ui/buttons/PrimaryButton'

const Navbar = () => {
  return (
    <nav className='container mx-auto flex justify-between p-5'>
      <NavLink to='/'>Logo</NavLink>
      <div className='hidden w-full md:block md:w-auto'>
        <ul>
          <li>
            <NavLink to='/login' className='font-medium px-5 py-2.5 rounded'>
              Login
            </NavLink>
            <PrimaryButton name='Apply Now' to='register' />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
