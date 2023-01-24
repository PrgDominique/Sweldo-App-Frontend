import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DangerAlert from '../ui/alerts/DangerAlert'
import SuccessAlert from '../ui/alerts/SuccessAlert'
import SubmitButton from '../ui/buttons/SubmitButton'
import AuthInput from '../ui/inputs/AuthInput'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    if (formData.password !== formData.confirm_password) {
      setError({ message: 'Passwords do not match', type: 'confirm_password' })
      setLoading(false)
      return
    }

    try {
      const result = await fetch('https://sweldoapi.hoster.ph/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }

      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
          }
        })
        setSuccess(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <>
      <h1 className='mb-4 text-3xl font-bold'>Register</h1>
      <div className='mb-8 space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <AuthInput
            label='First Name'
            id='first_name'
            type='text'
            placeholder='John'
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            error={
              error !== undefined && error.type === 'first_name'
                ? error.message
                : null
            }
          />
          <AuthInput
            label='Last Name'
            id='last_name'
            type='text'
            placeholder='Doe'
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            error={
              error !== undefined && error.type === 'last_name'
                ? error.message
                : null
            }
          />
        </div>
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
        <AuthInput
          label='Confirm Password'
          id='confirm_password'
          type='password'
          placeholder='Strong Password'
          value={formData.confirm_password}
          onChange={(e) =>
            setFormData({ ...formData, confirm_password: e.target.value })
          }
          error={
            error !== undefined && error.type === 'confirm_password'
              ? error.message
              : null
          }
        />
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
          name='Register'
          onClick={handleSubmit}
          loading={loading}
        />
      </div>
      <hr className='mb-4' />
      <div>
        Already have an account?{' '}
        <strong>
          <NavLink to='/login'>Login</NavLink>
        </strong>
      </div>
    </>
  )
}

export default RegisterForm
