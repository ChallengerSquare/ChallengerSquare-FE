import React, { useState } from 'react'
import { DropdownProps } from '@/types/dropdown'
import dropdown from '@svgs/dropdown.svg'
import styles from './Dropdown.module.scss'

interface Team {
  // 개최할 때 필요한 팀 관련 정보
}

const Dropdown = ({ options, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className={styles.dropdown} onClick={toggleDropdown}>
        <span className={selectedOption ? styles.selected : styles.placeholder}>
          {selectedOption || '개최할 팀을 선택하세요.'}
        </span>
        <img src={dropdown} alt="dd-btn" />
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)} className={styles.item}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Dropdown
