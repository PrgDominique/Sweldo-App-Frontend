import { useState } from 'react'
import SubmitTimeButton from '../ui/buttons/SubmitTimeButton'

const TimeButton = ({}) => {
  const [timeIn, setTimeIn] = useState(false)
  const [timeOut, setTimeOut] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  // button time in function
  const handleTimeIn = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    setTimeOut(true)
    setTimeIn(false)
  }

  //button timeout function
  const handleTimeOut = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)
    setTimeOut(false)
    setTimeIn(true)
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
