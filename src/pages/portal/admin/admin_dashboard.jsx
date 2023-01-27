import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatisticCard from '../../../components/portal/admin/dashboard/StatisticCard'
import * as RestApi from '../../../utils/rest_api_util'

const AdminDashboardPage = () => {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    totalEmployee: 0,
  })

  useEffect(() => {
    getDashboard()
    // eslint-disable-next-line
  }, [])

  const getDashboard = async () => {
    try {
      const result = await RestApi.getAdminDashboard()
      const response = await result.json()
      if (result.status === 200) {
        setStats({ ...stats, totalEmployee: response.totalEmployee })
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <StatisticCard name='Total Employee' value={stats.totalEmployee} />
        {/* Not final */}
        <StatisticCard name='Working Days' value='24' />
        <StatisticCard name='Payment Date' value='Jan 30, 2023' />
        <StatisticCard name='On Leave' value='5' />
      </div>
    </div>
  )
}

export default AdminDashboardPage
