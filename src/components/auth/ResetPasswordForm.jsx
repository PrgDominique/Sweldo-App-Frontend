import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DangerAlert from '../ui/alerts/DangerAlert'
import SuccessAlert from '../ui/alerts/SuccessAlert'
import SubmitButton from '../ui/buttons/SubmitButton'
import AuthInput from '../ui/inputs/AuthInput'

const ResetPasswordForm = () => {
  const location = useLocation()

  const [formData, setFormData] = useState({
    id: '',
    token: '',
    password: '',
    confirm_password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    applyToken()
    // eslint-disable-next-line
  }, [location])

  const applyToken = () => {
    const id = new URLSearchParams(location.search).get('id')
    const token = new URLSearchParams(location.search).get('token')
    setFormData((prevData) => {
      return {
        ...prevData,
        id,
        token,
      }
    })
  }

  const handleSumbit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    if (formData.password !== formData.confirm_password) {
      setError({
        message: 'Password does not match',
        type: 'confirm_password',
      })
      setLoading(false)
      return
    }

    try {
      const result = await fetch('http://127.0.0.1:8000/api/reset-password', {
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
      <h1 className='mb-4 text-3xl font-bold'>Reset Password</h1>
      <div className='mb-8 space-y-4'>
        <AuthInput
          label='New Password'
          id='new_password'
          type='password'
          placeholder='New Password'
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
          label='Confirm New Password'
          id='confirm_new_password'
          type='password'
          placeholder='Confirm New Password'
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
      <div>
        <SubmitButton
          name='Reset Password'
          onClick={handleSumbit}
          loading={loading}
        />
      </div>
    </>
  )
}

export default ResetPasswordForm
