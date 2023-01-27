import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeTable from '../../../components/portal/admin/employee/EmployeeTable'
import Pagination from '../../../components/portal/admin/employee/Pagination'
import * as RestApi from '../../../utils/rest_api_util'

const EmployeePage = () => {
  const navigate = useNavigate()

  const [employees, setEmployees] = useState()

  useEffect(() => {
    getEmployees()
    // eslint-disable-next-line
  }, [])

  const getEmployees = async (page = 1) => {
    try {
      const result = await RestApi.getEmployees(page)
      const response = await result.json()
      if (result.status === 200) {
        console.log(response.employees)
        setEmployees(response.employees)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className='mb-5'>
        <h1 className='text-3xl font-bold'>Employee Page</h1>
      </div>
      <div>
        <div className='mb-5'>
          <EmployeeTable employees={employees} />
        </div>
        <div>
          <Pagination pagination={employees} onClick={getEmployees} />
        </div>
      </div>
    </div>
  )
}

export default EmployeePage
