import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DangerAlert from '../../../components/ui/alerts/DangerAlert'
import SuccessAlert from '../../../components/ui/alerts/SuccessAlert'
import SubmitButton from '../../../components/ui/buttons/SubmitButton'
import AuthInput from '../../../components/ui/inputs/AuthInput'
import PageTitle from '../../../components/ui/titles/PageTitle'
import * as RestApi from '../../../utils/rest_api_util'

const Profile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line
  }, [])

  const getProfile = async () => {
    try {
      const result = await RestApi.getProfile()
      const response = await result.json()
      if (result.status === 200) {
        setFormData(response.user)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const result = await RestApi.getProfile(formData)
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
            address: '',
            phone: '',
          }
        })
        setSuccess(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div>
      <PageTitle title='Profile' />

      <div className='flex justify-end'>
        <button className='p-5 bg-sky-500'>Edit</button>
      </div>
      <div className='flex justify-center mb-4'>
        <div className='rounded-full bg-slate-700 w-40 h-40'>
          <img src='' alt='image' />
        </div>
      </div>
      <div className='mb-8 space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <AuthInput
            label='First Name'
            id='first_name'
            type='text'
            value={formData.first_name}
            disabled
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
            value={formData.first_name}
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={
            error !== undefined && error.type === 'email' ? error.message : null
          }
        />
        <AuthInput
          label='Address'
          id='address'
          type='text'
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          error={
            error !== undefined && error.type === 'address'
              ? error.message
              : null
          }
        />
        <AuthInput
          label='Phone'
          id='phone'
          type='text'
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={
            error !== undefined && error.type === 'phone' ? error.message : null
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
          name='Update'
          onClick={handleSubmit}
          loading={loading}
          fullWidth={true}
        />
      </div>
    </div>
  )
}

export default Profile
