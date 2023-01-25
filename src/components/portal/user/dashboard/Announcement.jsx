import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import * as RestApi from '../../../../utils/rest_api_util'

const Announcement = () => {
  const [announcement, setAnnouncement] = useState([])

  const navigate = useNavigate()

  //fetch the announcement from the database

  useEffect(() => {
    getAnnouncement()
    // eslint-disable-next-line
  }, [])

  const getAnnouncement = async () => {
    try {
      const result = await RestApi.getAnnouncement()
      const response = await result.json()
      if (result.status === 200) {
        setAnnouncement(response)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  return (
    <>
      <div className=''>
        <h1 className='mb-8 font-bold'>Announcement</h1>
        <hr className='mb-2' />
        {announcement.map((item) => (
          <>
            <h1 className='mb-8' key={item.id}>{item.title} </h1>
            <hr className='mb-2' />
          </>
        ))}

      </div>
    </>
  )
}

export default Announcement
