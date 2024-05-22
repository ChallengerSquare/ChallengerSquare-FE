import { useState } from 'react'
import dropdown from '@assets/svgs/edit/camera.svg'
import styles from './Dropdown.module.scss'

interface DropdownProps<T> {
  options: T[]
  onSelect: (value: T) => void
  element: (item: T) => string
  placeholder?: string
  border?: boolean
  width?: string
}

const Dropdown = <T extends unknown>({
  options,
  onSelect,
  element,
  placeholder,
  border = false,
  width = '500px',
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<T | null>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (option: T) => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <>
      <div>
        <button
          type="button"
          className={border ? styles.dropdownBorder : styles.dropdown}
          style={{ width }}
          onClick={toggleDropdown}
        >
          <span className={selectedOption ? styles.selected : ''}>
            {selectedOption ? element(selectedOption) : placeholder}
          </span>
          <img src={dropdown} alt="dd-btn" />
          {isOpen && (
            <ul className={styles.menu} style={{ width }}>
              {options.map((option, index) => (
                <li key={index} onClick={() => handleSelect(option)} className={styles.item}>
                  {element(option)}
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>
    </>
  )
}

export default Dropdown
