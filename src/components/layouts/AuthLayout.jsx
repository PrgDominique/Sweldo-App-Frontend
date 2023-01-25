import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
      return
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout
