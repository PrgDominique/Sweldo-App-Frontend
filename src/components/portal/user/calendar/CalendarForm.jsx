import { Calendar } from 'react-calendar'
import './CalendarForm.css'

const CalendarForm = () => {
  const onClickDay = (day) => {
    console.log(day)
  }

  return (
    <div>
      <Calendar onClickDay={onClickDay} />
    </div>
  )
}

export default CalendarForm
