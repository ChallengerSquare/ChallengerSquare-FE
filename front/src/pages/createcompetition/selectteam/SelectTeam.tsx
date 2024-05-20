import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { stepProps } from '@/types/step'
import { getTeamsinLeader } from '@/services/member'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Button from '@/components/Button/Button'
import Dropdown from '@components/Dropdown/Dropdown'
import { competitionForm } from '../store'
import styles from './SelectTeam.module.scss'

export interface TeamList {
  teamId: number
  teamName: string
}

const SelectTeam = ({ nextStep }: stepProps) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamList | null>(null)
  const setCompetitionForm = useSetRecoilState(competitionForm)
  const [isCheck, setIsCheck] = useState(false)
  //  const data = useRecoilValue(competitionForm)

  const {
    data: teams,
    isLoading,
    error,
  } = useQuery<TeamList[], Error>('teamsInLeader', async () => {
    const response = await getTeamsinLeader()
    return response.data
  })

  const handleSelect = (team: TeamList) => {
    setSelectedTeam(team)
    setIsCheck(true)
  }

  const handleNextStep = () => {
    if (selectedTeam) {
      setCompetitionForm((prev) => ({
        ...prev,
        contestCreateRequestDto: {
          ...prev.contestCreateRequestDto,
          teamId: selectedTeam.teamId,
        },
      }))
      nextStep?.()
    }
  }
  if (isLoading) console.log('loading...')
  if (error) console.log(error.message)

  return (
    <>
      <div className={styles.title}>대회를 개최할 팀을 선택해주세요.</div>
      <div className={styles.notice}>*대회 등록은 팀장만 가능합니다.</div>
      <div className={styles.dropdown}>
        <Dropdown<TeamList>
          options={teams || []}
          onSelect={handleSelect}
          element={(team) => team.teamName}
          placeholder="개최할 팀을 선택하세요."
        />
      </div>
      <div className={styles.create_team}>
        <Link to="/create-team">팀 생성하러 가기&gt;</Link>
      </div>
      <div className={styles.btn}>
        <Button variation="purple default" onClick={handleNextStep} disabled={!isCheck}>
          다음
        </Button>
      </div>
    </>
  )
}

export default SelectTeam
