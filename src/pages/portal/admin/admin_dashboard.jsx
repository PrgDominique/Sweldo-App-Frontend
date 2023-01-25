import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as RestApi from '../../../utils/rest_api_util'

const AdminDashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    getDashboard()
    // eslint-disable-next-line
  }, [])

  const getDashboard = async () => {
    try {
      const result = await RestApi.getAdminDashboard()
      const response = await result.json()
      if (result.status === 200) {
        console.log(response)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  return <div>Admin Dashboard</div>
}

export default AdminDashboard
