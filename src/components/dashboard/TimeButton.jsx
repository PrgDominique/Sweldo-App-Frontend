import { useState } from 'react'
import SubmitTimeButton from '../ui/buttons/SubmitTimeButton'
import * as RestApi from '../../utils/rest_api_util'

const TimeButton = ({}) => {
  const [timeIn, setTimeIn] = useState(true)
  const [timeOut, setTimeOut] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

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
    } catch (error) {}
    setLoading(false)
  }

  return (
    //default Time In button
    <>
      {
        // if timeIn is false, show Time In button
        timeIn ? (
          <SubmitTimeButton name='Time In' onClick={handleTimeIn} />
        ) : (
          // if timeIn is true, show Time Out button
          <SubmitTimeButton name='Time Out' onClick={handleTimeOut} />
        )
      }
    </>
  )
}

export default TimeButton
