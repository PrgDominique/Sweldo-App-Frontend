import { useState } from 'react'
import SubmitButton from '../../../ui/buttons/SubmitButton'
import AuthInput from '../../../ui/inputs/AuthInput'
import * as RestApi from '../../../../utils/rest_api_util'
import DangerAlert from '../../../ui/alerts/DangerAlert'
import SuccessAlert from '../../../ui/alerts/SuccessAlert'

const TaskForm = ({ selectedDate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: selectedDate
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const result = await RestApi.addTask(formData)
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }
      if (result.status === 200) {
        setFormData((prevData) => {
          return {
            ...prevData,
            name: '',
            description: '',
          }
        })
        setSuccess(response)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <div className='bg-white shadow-lg mt-5 p-5'>
      <h1 className='mb-4 text-3xl font-bold'>Create Task: {selectedDate}</h1>
      <div className='mb-8 space-y-4'>
        <AuthInput
          label='Name'
          id='name'
          type='text'
          placeholder='Task name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={
            error !== undefined && error.type === 'name' ? error.message : null
          }
        />
        <AuthInput
          label='Description'
          id='description'
          type='text'
          placeholder='Task description'
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={
            error !== undefined && error.type === 'description'
              ? error.message
              : null
          }
        />
        <DangerAlert
          message={
            error !== undefined && error.type === undefined
              ? error.message
              : null
          }
        />
        <SuccessAlert message={success?.message} />
      </div>
      <div className='mb-8'>
        <SubmitButton
          name='Create'
          onClick={handleSubmit}
          loading={loading}
          fullWidth={true}
        />
      </div>
    </div>
  )
}

export default TaskForm
