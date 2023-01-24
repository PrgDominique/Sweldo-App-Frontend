import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DangerAlert from '../ui/alerts/DangerAlert'
import SuccessAlert from '../ui/alerts/SuccessAlert'
import SubmitButton from '../ui/buttons/SubmitButton'
import AuthInput from '../ui/inputs/AuthInput'

const ForgotPasswordForm = () => {

  const [formData, setFormData] = useState({
    email: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const result = await fetch('http://127.0.0.1:8000/api/forgot-password', {
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
            email: '',
          }
        })
        setSuccess(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <>
      <h1 className='mb-4 text-3xl font-bold'>Forgot Password</h1>
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
        <SubmitButton name='Send me an email' onClick={handleSubmit} loading={loading} />
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

export default ForgotPasswordForm
