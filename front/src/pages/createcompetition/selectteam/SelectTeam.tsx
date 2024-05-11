import { useState } from 'react'
import { Link } from 'react-router-dom'
import { stepProps } from '@/types/step'
import Dropdown from '@components/Dropdown/Dropdown'
import Button from '@/components/Button/Button'
import styles from './SelectTeam.module.scss'

const SelectTeam = ({ nextStep }: stepProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const arr: string[] = ['100', '200', '300']

  const handleSelect = (team: string) => {
    setSelectedTeam(team)
  }

  return (
    <>
      <div className={styles.title}>대회를 개최할 팀을 선택해주세요.</div>
      <div className={styles.notice}>*대회 등록은 팀장만 가능합니다.</div>
      <div className={styles.dropdown}>
        <Dropdown options={arr} onSelect={handleSelect} />
      </div>
      <Link to="/create-team">
        <div className={styles.create_team}>팀 생성하러 가기&gt;</div>
      </Link>
      <div className={styles.btn}>
        <Button variation="purple default" onClick={nextStep}>
          다음
        </Button>
      </div>
    </>
  )
}

export default SelectTeam
