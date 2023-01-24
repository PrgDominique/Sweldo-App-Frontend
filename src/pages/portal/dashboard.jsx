import { useEffect } from 'react'
import * as RestApi from '../../utils/rest_api_util'

const Dashboard = () => {

  useEffect(() => {
    getDashboard()
  }, [])

  const getDashboard = async () => {
    try {
      const result = await RestApi.getDashboard()
      const response = await result.json()
    } catch (error) {}
  }

  return <div>Dashboard</div>
}

export default Dashboard
