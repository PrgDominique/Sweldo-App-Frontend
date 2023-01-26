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

  const deleteTask = async (id) => {
    try {
      await RestApi.deleteTask(id)
    } catch (error) {}
  }

  return (
    <div>
      <Calendar
        onActiveStartDateChange={onActiveStartDateChange}
        onChange={onChange}
        tileContent={({ date, view }) => {
          return view === 'month' &&
            month === date.getMonth() &&
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
          <div key={task.id} className='flex justify-between'>
            {task.name}
            <button
              className='bg-red-600 text-white font-medium p-2 rounded hover:bg-red-500'
              onClick={() => deleteTask(task.id)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                class='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Task form */}
      {selectedDate !== undefined && <TaskForm selectedDate={selectedDate} />}
    </div>
  )
}

export default CalendarForm
