import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TimeCard from '../../../components/portal/user/dashboard/TimeCard'
import * as RestApi from '../../../utils/rest_api_util'

const Dashboard = () => {
  const navigate = useNavigate()
  const [isClockIn, setIsClockIn] = useState(false)

  useEffect(() => {
    getDashboard()
    // eslint-disable-next-line
  }, [])

  const getDashboard = async () => {
    try {
      const result = await RestApi.getDashboard()
      const response = await result.json()
      if (result.status === 200) {
        setIsClockIn(response.isClockIn)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  return (
    <>
    
      <div className='container m-5 flex'>
        <div className='w-1/6 m-5 p-4 shadow-md lg:max-w-lg h-1/6 '>
          <TimeCard isClockIn={isClockIn} />

        </div>
        <div className='w-1/3 p-4 shadow-md lg:max-w-lg'>
          <h1>Announcement</h1>
          
   </div>
      </div>
    </>
  )
}

export default Dashboard
