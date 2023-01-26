import { Calendar } from 'react-calendar'
import './CalendarForm.css'
import * as RestApi from '../../../../utils/rest_api_util'
import { useEffect, useState } from 'react'

const CalendarForm = () => {
  const [monthlyTasks, setMonthlyTasks] = useState([])
  const [dailyTasks, setDailyTasks] = useState([])

  useEffect(() => {
    getMonthlyTasks(Date.parse(new Date()) / 1000)
  }, [])

  const getMonthlyTasks = async (date) => {
    try {
      const result = await RestApi.getMonthlyTasks(date)
      const response = await result.json()
      if (result.status === 200) {
        setMonthlyTasks(response.tasks)
      }
    } catch (error) {}
  }

  const getDailyTasks = async (date) => {
    try {
      const result = await RestApi.getDailyTasks(date)
      const response = await result.json()
      if (result.status === 200) {
        setDailyTasks(response.tasks)
      }
    } catch (error) {}
  }

  const onActiveStartDateChange = async ({ activeStartDate }) => {
    // Clear tasks when navigating
    setMonthlyTasks([])
    setDailyTasks([])
    // Get monthly tasks
    getMonthlyTasks(Date.parse(activeStartDate) / 1000)
  }

  const onChange = async (value) => {
    getDailyTasks(Date.parse(value) / 1000)
  }

  return (
    <div>
      <Calendar
        onActiveStartDateChange={onActiveStartDateChange}
        onChange={onChange}
        tileContent={({ date, view }) => {
          return view === 'month' &&
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
        {dailyTasks.length !== 0 && <h1 className='text-2xl'>Task List</h1>}
        {dailyTasks.map((task) => (
          <div key={task.id} className='bg-white rounded shadow-md p-5'>
            {task.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarForm
