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
    <div>
      <div className='grid grid-cols-1 md:grid-cols-6 gap-5'>
        <div className='md:col-span-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            <div className='bg-white shadow p-5'>1</div>
            <div className='bg-white shadow p-5'>2</div>
            <div className='bg-white shadow p-5'>3</div>
            <div className='bg-white shadow p-5'>4</div>
            <div className='md:col-span-2 lg:col-span-4 bg-white shadow p-5'>Attendance</div>
          </div>
        </div>
        <div className='md:col-span-2 bg-white shadow p-5'>Announcement</div>
      </div>

      {/* <div className='grid grid-cols-4'>
        <div className='col-span-3'>
          <div className='grid grid-cols-3'>
            <div className='row-span-1'>qwe</div>

            <div className='row-span-1'>asd</div>

            <div className='row-span-1'>zxc</div>
          </div>
          
        </div>
          <div className='col-span-3'>
            qwe
          </div>
          

        <div className='col-span-1 gap-12'>
          <div className="grid cols-span-1">

          <h1 className=' flex justify-center font-bold text-xl mb-5'>
            Announcement
          </h1>
          <div className='announce overflow-auto mb-5 shadow flex justify-center'>
            <Announcement announcements={announcements} />
          </div>
          <div className='shoadow mt-6'>
            <TimeCard isClockIn={isClockIn} />
          </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard
