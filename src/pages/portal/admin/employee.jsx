import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        <h1 className='text-3xl font-bold'>
            Employee Page
        </h1>
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
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <ul className='flex gap-2'>

            {/* TODO: Implement pagination */}

            {/* Previous */}
            <li>
              <button className='bg-gray-600 text-white font-medium p-2.5 rounded hover:bg-gray-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </button>
            </li>

            <li>
              <button className='bg-blue-600 text-white font-medium px-5 py-2.5 rounded'>
                1
              </button>
            </li>

            <li>
              <button className='bg-gray-600 text-white font-medium px-5 py-2.5 rounded hover:bg-gray-700'>
                2
              </button>
            </li>

            <li>
              <button className='bg-gray-600 text-white font-medium px-5 py-2.5 rounded hover:bg-gray-700'>
                3
              </button>
            </li>

            {/* Next */}
            <li>
              <button className='bg-gray-600 text-white font-medium p-2.5 rounded hover:bg-gray-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmployeePage
