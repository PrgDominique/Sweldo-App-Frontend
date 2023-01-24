import { useEffect } from 'react'
import TimeButton from '../../components/dashboard/TimeButton'
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

  return (
    <>
    <div className="container m-5 ">
    <div className="w-1/3 p-4 shadow-md lg:max-w-lg">

      <TimeButton />
    </div>
    </div>
    </>
  )
}

export default Dashboard
