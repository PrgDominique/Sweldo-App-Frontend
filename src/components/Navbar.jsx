import { NavLink } from 'react-router-dom'
import PrimaryButton from './ui/buttons/PrimaryButton'
import SecondaryButton from './ui/buttons/SecondaryButton'

const Navbar = () => {
  return (
    <nav className='container mx-auto flex justify-between p-5'>
      <NavLink to='/'>Logo</NavLink>
      <div className='hidden w-full md:block md:w-auto'>
        <ul>
          <li className='space-x-5'>
            <SecondaryButton name='Login' to='login' />
            <PrimaryButton name='Apply Now' to='register' />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
