import { useState } from 'react'
import AuthInput from '../../../ui/inputs/AuthInput'
import * as RestApi from '../../../../utils/rest_api_util'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../../../ui/buttons/SubmitButton'
import FormTitle from '../../../ui/titles/FormTitle'

const EmployeeTable = ({ employees }) => {
  const navigate = useNavigate()
  const [selectedEmployee, setSelectedEmployee] = useState()
  const [formData, setFormData] = useState({
    normal: '',
  })

  const [loading, setLoading] = useState(false)

  const getEmployee = async (employee) => {
    try {
      const result = await RestApi.getEmployee(employee.id)
      const response = await result.json()
      if (result.status === 200) {
        setFormData({ ...formData, normal: response.normal })
        setSelectedEmployee(employee)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  const updateEmployee = async () => {
    setLoading(true)
    try {
      const result = await RestApi.updateEmployee(selectedEmployee.id, formData)
      const response = await result.json()
      if (result.status === 200) {
        setSelectedEmployee(undefined)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <>
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
                  <th className='p-2.5'>{employees.from + index}</th>
                  <td className='p-2.5'>{employee.first_name}</td>
                  <td className='p-2.5'>{employee.last_name}</td>
                  <td className='p-2.5'>{employee.email}</td>
                  <td className='p-2.5'>
                    <button onClick={() => getEmployee(employee)}>Edit</button>
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
      {selectedEmployee !== undefined && (
        <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen flex items-center p-5'>
          <div className='w-full flex justify-center'>
            <div className='bg-white w-full lg:w-1/2 rounded p-5'>
              <div className='flex justify-between'>
                <FormTitle
                  title={`${selectedEmployee.first_name} ${selectedEmployee.last_name} 's Details`}
                />
                <div>
                  <button
                    className='bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
                    onClick={() => setSelectedEmployee(undefined)}
                  >
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
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='mb-8 space-y-4'>
                <AuthInput
                  label='Normal Rate'
                  id='normal_rate'
                  type='text'
                  placeholder='100'
                  value={formData.normal}
                  onChange={(e) =>
                    setFormData({ ...formData, normal: e.target.value })
                  }
                />
              </div>
              <SubmitButton
                name='Update'
                onClick={updateEmployee}
                loading={loading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EmployeeTable
