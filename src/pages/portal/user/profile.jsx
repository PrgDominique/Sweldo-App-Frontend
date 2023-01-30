import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/ui/titles/PageTitle'
import * as RestApi from '../../../utils/rest_api_util'

const Profile = () => {
  const [user, setUser] = useState()

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
        setUser(response.user)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }
  return (
    <div>
      {/* <div className='border-2 border-blue p-5 m-5 '>
        <span class='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
          Active
        </span>

        <p className='text-2xl font-bold'>IT001</p>

        <p className='text-xl font-bold'>John Doe</p>

        <p>Junior Web Developer - IT Department</p>
        <p>Expected Salary: 15000</p>
      </div>

      <div className='m-5'>
        <p>Contact Details</p>
        <p>🏠Manila, Philippines</p>
        <p>📧johndoe@gmail.com</p>
        <p>📞09123456789</p>
      </div>
      <div className='m-5'>
        <p>In Case of Emergency:</p>
        <p>Maria Doe</p>
        <p>🏠 Manila, Philippines</p>
        <p>📞09123584718</p>
      </div> */}
          <PageTitle title='Profile' />


    </div>
  )
}

export default Profile
