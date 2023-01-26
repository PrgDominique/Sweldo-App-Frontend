import { Calendar } from 'react-calendar'
import './CalendarForm.css'
import * as RestApi from '../../../../utils/rest_api_util'
import { useEffect, useState } from 'react'

const CalendarForm = () => {
  const [monthlyTasks, setMonthlyTasks] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getMonthlyTasks()
  }, [])

  const getMonthlyTasks = async () => {
    try {
      const result = await RestApi.getMonthlyTasks()
      const response = await result.json()
      if (result.status === 200) {
        setMonthlyTasks(response.tasks)
      }
    } catch (error) {}
  }

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
      <Calendar
        onChange={onChange}
        tileContent={({ activeStartDate, date, view }) => {
          return view === 'month' &&
            date.getMonth() === new Date().getMonth() &&
            monthlyTasks[date.getDate()] !== undefined ? (
            <div className='mt-1 flex justify-center'>
              <div className='bg-blue-100 text-blue-800 text-xs font-medium p-1 rounded'>
                {monthlyTasks[date.getDate()]} task(s)
              </div>
            </div>
          ) : null
        }}
      />
      <div className='space-y-5 pt-5'>
        <h1 className='text-2xl'>Task List</h1>
        {tasks.map((task) => (
          <div key={task.id} className='bg-white rounded shadow-md p-5'>
            {task.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarForm
