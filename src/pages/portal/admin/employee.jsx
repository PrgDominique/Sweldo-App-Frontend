import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
          <table className='w-full text-left'>
            <thead className='bg-gray-100 uppercase'>
              <tr>
                <th className='p-2.5'>#</th>
                <th className='p-2.5'>First Name</th>
                <th className='p-2.5'>Last Name</th>
                <th className='p-2.5'>Email</th>
                <th className='p-2.5'>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees !== undefined &&
                (employees.data.length !== 0 ? (
                  employees.data.map((employee, index) => (
                    <tr key={index} className='border-b'>
                      <th className='p-2.5'>{employee.id}</th>
                      <td className='p-2.5'>{employee.first_name}</td>
                      <td className='p-2.5'>{employee.last_name}</td>
                      <td className='p-2.5'>{employee.email}</td>
                      <td className='p-2.5'>
                        <button>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='5' className='text-center p-2.5'>
                      No employee available
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination pagination={employees} onClick={getEmployees} />
        </div>
      </div>
    </div>
  )
}

export default EmployeePage
