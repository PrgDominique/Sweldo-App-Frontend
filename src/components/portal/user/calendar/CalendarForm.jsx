import { Calendar } from 'react-calendar'
import './CalendarForm.css'
import * as RestApi from '../../../../utils/rest_api_util'
import { useEffect, useState } from 'react'
import TaskForm from './TaskForm'

const CalendarForm = () => {
  const [selectedDate, setSelectedDate] = useState()
  const [month, setMonth] = useState(0)
  const [monthlyTasks, setMonthlyTasks] = useState([])
  const [dailyTasks, setDailyTasks] = useState([])

  useEffect(() => {
    setMonth(new Date().getMonth())
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
    // Set month
    setMonth(activeStartDate.getMonth())
    // Clear tasks when navigating
    setMonthlyTasks([])
    setDailyTasks([])
    // Get monthly tasks
    getMonthlyTasks(Date.parse(activeStartDate) / 1000)
  }

  const onChange = async (value) => {
    setSelectedDate(Date.parse(value) / 1000)
    getDailyTasks(Date.parse(value) / 1000)
  }

  return (
    <div>
      <Calendar
        onActiveStartDateChange={onActiveStartDateChange}
        onChange={onChange}
        tileContent={({ date, view }) => {
          return view === 'month' &&
            month == date.getMonth() &&
            monthlyTasks[date.getDate()] !== undefined ? (
            <div className='mt-1 flex justify-center'>
              <div className='bg-blue-100 text-blue-800 text-xs font-medium p-1 rounded'>
                {monthlyTasks[date.getDate()]} task(s)
              </div>
            </div>
          ) : null
        }}
      />

      <div className='bg-white shadow-lg mt-5 p-5'>
        {dailyTasks.length !== 0 && <h1 className='text-2xl'>Task List</h1>}
        {dailyTasks.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>

      {/* Task form */}
      {selectedDate !== undefined && <TaskForm selectedDate={selectedDate} />}
    </div>
  )
}

export default CalendarForm
