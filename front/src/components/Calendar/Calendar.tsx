import { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'
import { getMonth, getYear, isSameDay } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import LeftArrow from '@svgs/left_arrow.svg'
import RightArrow from '@svgs/right_arrow.svg'
import styles from './Calendar.module.scss'

interface Props {
  selectedDate: Date | null
  setSelectedDate: Dispatch<SetStateAction<Date | null>>
  minDate?: Date | null
  maxDate?: Date | null
  width?: string
}

export const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

const Calendar = ({
  selectedDate,
  setSelectedDate,
  minDate = new Date('1924-01-01'),
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
}: Props) => {
  const minYear = minDate ? getYear(minDate) : getYear(new Date('1924-01-01'))
  const maxYear = maxDate ? getYear(maxDate) : getYear(new Date().setFullYear(new Date().getFullYear() + 10))
  const YEARS = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index)
  return (
    <DatePicker
      placeholderText="        .    . "
      dateFormat="yyyy.MM.dd"
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
      showYearDropdown
      scrollableYearDropdown
      shouldCloseOnSelect
      yearDropdownItemNumber={100}
      minDate={minDate || new Date('1900-01-01')}
      maxDate={maxDate || new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
      calendarClassName={styles.calenderWrapper}
      selected={selectedDate}
      dayClassName={(date) => {
        const isSelected = selectedDate && isSameDay(date, selectedDate)
        return isSelected ? styles.selected : styles.unselected
      }}
      onChange={(date) => setSelectedDate(date)}
      className={styles.datePicker}
      renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className={styles.customHeaderContainer}>
          <div>
            <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
            <select
              value={getYear(date)}
              className={styles.year}
              onChange={({ target: { value } }) => changeYear(+value)}
            >
              {YEARS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={decreaseMonth}
              className={styles.monthButton}
              disabled={prevMonthButtonDisabled}
            >
              <img src={LeftArrow} alt="Left Arrow" />
            </button>
            <button
              type="button"
              onClick={increaseMonth}
              className={styles.monthButton}
              disabled={nextMonthButtonDisabled}
            >
              <img src={RightArrow} alt="Right Arrow" />
            </button>
          </div>
        </div>
      )}
    />
  )
}

export default Calendar
