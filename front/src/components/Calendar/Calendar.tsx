import { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'
import { getMonth, getYear } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import LeftArrow from '@svgs/left_arrow.svg'
import RightArrow from '@svgs/right_arrow.svg'
import styles from './Calendar.module.scss'

interface Props {
  selectedDate: Date | null
  setSelectedDate: Dispatch<SetStateAction<Date | null>>
}

const YEARS = Array.from({ length: getYear(new Date()) + 1 - 1900 }, (_, i) => getYear(new Date()) - i)
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

const Calendar = ({ selectedDate, setSelectedDate }: Props) => {
  return (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        placeholderText="YYYY.MM.DD"
        dateFormat="yyyy.MM.dd"
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        showYearDropdown
        scrollableYearDropdown
        shouldCloseOnSelect
        yearDropdownItemNumber={100}
        minDate={new Date('1900-01-01')}
        maxDate={new Date()}
        selected={selectedDate}
        calendarClassName={styles.calenderWrapper}
        dayClassName={(d) =>
          selectedDate && (d.getDate() === selectedDate.getDate() ? styles.selectedDay : styles.unselectedDay)
        }
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
    </div>
  )
}

export default Calendar
