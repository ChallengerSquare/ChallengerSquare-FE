import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getTeamsinLeader } from '@/services/member'
import Dropdown from '@/components/Dropdown/Dropdown'
import Button from '@/components/Button/Button'
import { ParticipateTeamRequest } from '@/types/api'
import logoIcon from '@svgs/logo/challSv2.svg'
import ResultModal from './ResultModal/ResultModal'
import styles from './ParticipateWindow.module.scss'

export interface TeamList {
  teamId: number
  teamName: string
}

const ParticipateWindow = () => {
  const { competitionId } = useParams()
  const [team, setTeam] = useState<TeamList | null>(null)
  const [isSubmit, setIsSubmit] = useState(false)
  const [text, setText] = useState<string>('')
  const [request, setRequest] = useState<ParticipateTeamRequest | null>(null)
  const handleData = () => {
    if (!team) alert('팀을 선택해주세요.')
    else if (!text) alert('내용을 입력해주세요.')
    else {
      const requestData: ParticipateTeamRequest = {
        contestId: Number(competitionId),
        teamId: team.teamId,
        contestParticipantsReason: text,
      }
      setRequest(requestData)
      setIsSubmit(true)
    }
  }

  const {
    data: teams,
  } = useQuery<TeamList[], Error>('teamsInLeader', async () => {
    const response = await getTeamsinLeader()
    return response.data
  })

  const handleSelect = (team: TeamList) => {
    setTeam(team)
  }
  const handleClose = () => {
    setIsSubmit(false)
  }

  const handleTeam = () => {
    if (window.opener && !window.opener.closed) {
      window.opener.location.href = '/create-team'
    }
    window.close()
  }
  return (
    <>
      <div className={styles.header}>
        <img src={logoIcon} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.dropdown}>
        <div className={styles.title}>1. 팀을 선택하세요.</div>
        <div className={styles.content}>
          <Dropdown<TeamList>
            options={teams || []}
            onSelect={handleSelect}
            element={(team) => team.teamName}
            placeholder="신청할 팀을 선택하세요."
            border={true}
          />
        </div>
        <div className={styles.link}>
          <button type="button" onClick={handleTeam}>
            팀 생성하러가기 &gt;
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>2. 해당 대회에 신청하는 이유를 작성해주세요.</div>
        <textarea
          className={styles.form}
          onChange={(item) => {
            setText(item.target.value)
          }}
          maxLength={299}
          placeholder="작성하신 내용은 대회 측에서 선발 기준에 활용될 수 있습니다."
        />
        <p>({text.length} / 300)</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.btn_submit}>
          <Button variation="purple" width={120} onClick={handleData}>
            신청하기
          </Button>
        </div>
        <div className={styles.btn_cancel}>
          <Button variation="white" width={120} onClick={window.close}>
            취소하기
          </Button>
        </div>
        <ResultModal isOpen={isSubmit} handleClose={handleClose} data={request} />
      </div>
    </>
  )
}
export default ParticipateWindow
