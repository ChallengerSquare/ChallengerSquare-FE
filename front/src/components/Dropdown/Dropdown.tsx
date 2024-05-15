import React, { useState, useEffect } from 'react'
import dropdown from '@svgs/dropdown.svg'
import styles from './Dropdown.module.scss'

interface DropdownProps<T> {
  options: T[]
  onSelect: (value: T) => void
  element: (item: T) => string
  placeholder?: string
  width?: string
}

const Dropdown = <T extends unknown>({
  options,
  onSelect,
  element,
  placeholder,
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
        <button type="button" className={styles.dropdown} style={{ width }} onClick={toggleDropdown}>
          <span className={selectedOption ? styles.selected : ''}>
            {selectedOption ? element(selectedOption) : placeholder}
          </span>
          <img src={dropdown} alt="dd-btn" />
        </button>
        {isOpen && (
          <ul className={styles.menu} style={{ width }}>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option)} className={styles.item}>
                {element(option)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Dropdown
