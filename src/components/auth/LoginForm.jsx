import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DangerAlert from '../ui/alerts/DangerAlert'
import SuccessAlert from '../ui/alerts/SuccessAlert'
import SubmitButton from '../ui/buttons/SubmitButton'
import AuthInput from '../ui/inputs/AuthInput'

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
      const result = await fetch('http://127.0.0.1:8000/api/login', {
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
            password: '',
          }
        })
        setSuccess(response)
        navigate('/dashboard')
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
          placeholder='Enter Your Email'
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
          placeholder='Enter Your Password'
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
        <DangerAlert
          message={
            error !== undefined && error.type === undefined
              ? error.message
              : null
          }
        />
        <SuccessAlert message={success?.message} />
      </div>
      <div>
        <SubmitButton name='Login' onClick={handleSubmit} loading={loading} />
      </div>
    </>
  )
}

export default LoginForm
