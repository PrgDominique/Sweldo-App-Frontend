import { useState } from 'react'
import * as RestApi from '../../../../utils/rest_api_util'
import EmployeeForm from './EmployeeForm'

const EmployeeTable = ({ employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState()

  const getEmployee = async (employee) => {
    try {
      const result = await RestApi.getEmployee(employee.id)
      const response = await result.json()
      if (result.status === 200) {
        setSelectedEmployee({
          employee: employee,
          rate: response.normal
        })
      }
    } catch (error) {}
  }

  const closeForm = () => {
    setSelectedEmployee(undefined)
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
      {selectedEmployee && (
        <EmployeeForm selectedEmployee={selectedEmployee} closeForm={closeForm} />
      )}
    </>
  )
}

export default EmployeeTable
