import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PrimaryButton from '../../components/ui/buttons/PrimaryButton'

const VerifyAccountPage = () => {
  const location = useLocation()
  const [message, setMessage] = useState()

  useEffect(() => {
    validateAccount()
    // eslint-disable-next-line
  }, [location])

  const validateAccount = async () => {
    try {
      const id = new URLSearchParams(location.search).get('id')
      const token = new URLSearchParams(location.search).get('token')
      const result = await fetch('http://127.0.0.1:8000/api/verify/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          token: token,
        }),
      })
      let response = await result.json()
      setTimeout(async () => {
        setMessage(response)
      }, 2000)
    } catch (error) {}
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-3xl font-bold'>
          {message ? message.message : 'Verifying... Please wait'}
        </h1>
        <PrimaryButton name='Back to Home' to='/' />
      </div>
    </div>
  )
}

export default VerifyAccountPage
