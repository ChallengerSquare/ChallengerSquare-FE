import { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'
import { getMonth, getYear, max } from 'date-fns'
import { ko } from 'date-fns/locale'
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
    <div className={styles.datePickerWrapper}>
      <DatePicker
        locale={ko}
        placeholderText="YYYY.MM.DD"
        dateFormat="yyyy.MM.dd"
        showYearDropdown
        scrollableYearDropdown
        shouldCloseOnSelect
        yearDropdownItemNumber={100}
        minDate={minDate}
        maxDate={maxDate}
        selected={selectedDate}
        calendarClassName={styles.calenderWrapper}
        dayClassName={(d) => {
          return (
            selectedDate &&
            (d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() ===
            selectedDate.getFullYear().toString() +
              selectedDate.getMonth().toString() +
              selectedDate.getDate().toString()
              ? styles.selectedDay
              : styles.unselectedDay)
          )
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
                {!prevMonthButtonDisabled && <img src={LeftArrow} alt="Left Arrow" />}
              </button>
              <button
                type="button"
                onClick={increaseMonth}
                className={styles.monthButton}
                disabled={nextMonthButtonDisabled}
              >
                {!nextMonthButtonDisabled && <img src={RightArrow} alt="Right Arrow" />}
              </button>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default Calendar
