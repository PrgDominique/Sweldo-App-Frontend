import { useEffect, useState } from 'react'
import SubmitButton from '../../../ui/buttons/SubmitButton'
import * as RestApi from '../../../../utils/rest_api_util'
import SuccessAlert from '../../../ui/alerts/SuccessAlert'
import DangerAlert from '../../../ui/alerts/DangerAlert'

const TimeCard = ({ isClockIn }) => {
  const [timeIn, setTimeIn] = useState(true)
  const [timeOut, setTimeOut] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  //temporary date
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  // rerender the isClockIn state after clock in
  //and clean the success message after 3 seconds
  useEffect(() => {
    RestApi.getDashboard()

    const timer = setTimeout(() => {
      setSuccess(undefined)
    }, 3000)
    return () => clearTimeout(timer)
  }, [isClockIn])

  // button time in function
  const handleTimeIn = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)
    try {
      const result = await RestApi.clockIn()
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }
      if (result.status === 200) {
        setTimeOut(true)
        setTimeIn(false)
      }
      setSuccess(response)
    } catch (error) {}
    setLoading(false)
  }

  //button timeout function
  const handleTimeOut = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)
    try {
      const result = await RestApi.clockOut()
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }
      if (result.status === 200) {
        setTimeOut(false)
        setTimeIn(true)
      }
      setSuccess(response)
    } catch (error) {}
    setLoading(false)
  }

  //get the current time every second

  const date = new Date().toLocaleDateString('en-us', options)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    //default Time In button
    <>
      <div className='grid grid-cols-1'>
        <div className='flex justify-center'>
          <h1 className='col-span-1 text-2xl mb-4'>{time}</h1>
        </div>

        {
          // if User already clock in, show Time Out button
          isClockIn ? (
            <>
              <div className='grid mb-3'>
                <SubmitButton
                  name='Time Out'
                  onClick={handleTimeOut}
                  loading={loading}
                />
                <SuccessAlert message={success?.message} />
              </div>
            </>
          ) : (
            // if User already clock out, show Time In button
            <>
              <div className='grid mb-3'>
                <SubmitButton
                  name='Time In'
                  onClick={handleTimeIn}
                  loading={loading}
                />
              </div>

              <SuccessAlert message={success?.message} />
              <DangerAlert message={error?.message} />
            </>
          )
        }
        <div className="flex justify-center">

        <h1 className='text-1xl'>{date}</h1>
        </div>
      </div>
    </>
  )
}

export default TimeCard
