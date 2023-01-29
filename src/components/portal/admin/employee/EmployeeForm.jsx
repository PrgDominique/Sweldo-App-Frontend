
import SubmitButton from '../../../ui/buttons/SubmitButton'
import AuthInput from '../../../ui/inputs/AuthInput'
import FormTitle from '../../../ui/titles/FormTitle'
import * as RestApi from '../../../../utils/rest_api_util'
import { useState } from 'react'

const EmployeeForm = ({ selectedEmployee, closeForm }) => {
  const [formData, setFormData] = useState({
    normal: selectedEmployee.rate,
  })

  const [loading, setLoading] = useState(false)

  const updateEmployee = async () => {
    setLoading(true)
    try {
      const result = await RestApi.updateEmployee(selectedEmployee.employee.id, formData)
      const response = await result.json()
      if (result.status === 200) {
        closeForm()
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div className='bg-black/75 fixed top-0 left-0 z-10 w-full h-screen flex items-center p-5'>
      <div className='w-full flex justify-center'>
        <div className='bg-white w-full lg:w-1/2 rounded p-5'>
          <div className='flex justify-between'>
            <FormTitle
              title={`${selectedEmployee.employee.first_name} ${selectedEmployee.employee.last_name} 's Details`}
            />
            <div>
              <button
                className='bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-500'
                onClick={closeForm}
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
  )
}

export default EmployeeForm
