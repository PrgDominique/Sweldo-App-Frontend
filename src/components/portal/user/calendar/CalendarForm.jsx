import { Calendar } from 'react-calendar'
import './CalendarForm.css'
import * as RestApi from '../../../../utils/rest_api_util'
import { useState } from 'react'

const CalendarForm = () => {
  const [tasks, setTasks] = useState([])

  const onChange = async (value) => {
    try {
      const result = await RestApi.getTasks(Date.parse(value) / 1000)
      const response = await result.json()
      if (result.status === 200) {
        setTasks(response.tasks)
      }
    } catch (error) {}
  }

  return (
    <div>
      <Calendar onChange={onChange} />
      <div className='space-y-5 pt-5'>
        <h1 className='text-2xl'>Task List</h1>
        {
          tasks.map((task) => (
            <div key={task.id} className='bg-white rounded shadow-md p-5'>{task.name}</div>
          ))
        }
      </div>
    </div>
  )
}

export default CalendarForm
