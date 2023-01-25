import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DangerAlert from '../ui/alerts/DangerAlert'
import SuccessAlert from '../ui/alerts/SuccessAlert'
import SubmitButton from '../ui/buttons/SubmitButton'
import AuthInput from '../ui/inputs/AuthInput'
import * as RestApi from '../../utils/rest_api_util'

const LoginForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const result = await RestApi.login(formData)
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }
      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            email: '',
            password: '',
          }
        })
        localStorage.setItem('first_name', response.user.first_name)
        localStorage.setItem('last_name', response.user.last_name)
        localStorage.setItem('email', response.user.email)
        localStorage.setItem('is_admin', response.user.is_admin)
        localStorage.setItem('token', response.user.access_token)
        if (response.user.is_admin === '0') {
          navigate('/dashboard')
          return
        }
        navigate('/admin/dashboard')
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <>
      <h1 className='mb-4 text-3xl font-bold'>Login</h1>
      <div className='mb-8 space-y-4'>
        <AuthInput
          label='Email'
          id='email'
          type='email'
          placeholder='johndoe@gmail.com'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={
            error !== undefined && error.type === 'email' ? error.message : null
          }
        />
        <AuthInput
          label='Password'
          id='password'
          type='password'
          placeholder='Strong Password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={
            error !== undefined && error.type === 'password'
              ? error.message
              : null
          }
        />
        <small>
          <NavLink to='/forgot-password'>Forgot Password</NavLink>
        </small>
        <DangerAlert
          message={
            error !== undefined && error.type === undefined
              ? error.message
              : null
          }
        />
        <SuccessAlert message={success?.message} />
      </div>
      <div className='mb-8'>
        <SubmitButton
          name='Login'
          onClick={handleSubmit}
          loading={loading}
          fullWidth={true}
        />
      </div>
      <hr className='mb-4' />
      <div>
        Don't have an account?{' '}
        <strong>
          <NavLink to='/register'>Register</NavLink>
        </strong>
      </div>
    </>
  )
}

export default LoginForm
