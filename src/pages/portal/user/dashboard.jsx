import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Announcement from '../../../components/portal/user/dashboard/Announcement'
import CalendarWidget from '../../../components/portal/user/dashboard/CalendarWidget'
import TimeCard from '../../../components/portal/user/dashboard/TimeCard'
import * as RestApi from '../../../utils/rest_api_util'

const Dashboard = () => {
  const navigate = useNavigate()
  const [isClockIn, setIsClockIn] = useState(false)
  const [announcements, setAnnouncements] = useState([])

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
        setAnnouncements(response.announcements)

      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  return (
    <>

     <div className='w-1/2 p-5 shadow-md lg:max-w-lg  overflow-auto float-right announce flex justify-center'>
              <Announcement announcements={announcements}/>
            </div>
    <div className="flex gap-x-12 ">

          <div className='w-1/4 p-4 shadow-md lg:max-w-lg h-auto flex justify-center'>
            <TimeCard isClockIn={isClockIn} />
          </div>
          <div className='w-1/2 p-4 shadow-md lg:max-w-lg  h-10 flex  justify-center'>
            <CalendarWidget />
        </div>
    </div>
           
    </>
  )
}

export default Dashboard
