import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeTable from '../../../components/portal/admin/employee/EmployeeTable'
import Pagination from '../../../components/portal/admin/employee/Pagination'
import AuthInput from '../../../components/ui/inputs/AuthInput'
import PageTitle from '../../../components/ui/titles/PageTitle'
import * as RestApi from '../../../utils/rest_api_util'

const EmployeePage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
  })
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
        setEmployees(response.employees)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  const findEmployee = async (name) => {
    if (name.length === 0) {
      getEmployees(1)
      return
    }
    try {
      const result = await RestApi.findEmployee(name)
      const response = await result.json()
      if (result.status === 200) {
        setEmployees(response.employees)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <PageTitle title='Employee' />
      <div>
        <div className='mb-5'>
          <AuthInput
            id='name'
            type='text'
            placeholder='Search for name or email'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              findEmployee(e.target.value)
            }}
          />
        </div>
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
