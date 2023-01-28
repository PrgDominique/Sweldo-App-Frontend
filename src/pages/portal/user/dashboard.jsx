import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Announcement from '../../../components/portal/user/dashboard/Announcement'
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
      <div className='grid grid-cols-6'>
        <div className='col-span-4'>
          <div className='grid grid-cols-4 gap-5'>
            <div className='col-span-1 shadow h-24 w-48 justify-center flex items-center'>Weekly</div>

            <div className='col-span-1 shadow justify-center flex items-center h-24 w-48'>Monthly</div>

            <div className='col-span-1 shadow justify-center flex items-center h-24 w-48'>Blank</div>
            <div className='col-span-1 shadow justify-center flex items-center h-24 w-48'>Expected Salary</div>
          </div>
          
        </div>
     
          

        <div className='col-span-2 '>
          <div className="grid cols-span-1">

          <h1 className=' flex justify-center font-bold text-xl '>
            Announcement
          </h1>
          <div className='announce overflow-auto mb-5 shadow flex justify-center'>
            <Announcement announcements={announcements} />
          </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
