import Button from '@/components/Button/Button'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '@/stores/userState'
import { User } from '@/types/user'
import { getParticipantsTeam, createParticipantsTeam } from '@services/team'
import Navbar from '@/components/Navbar/Navbar'
import ProfileImg from '@/components/ProfileImg/ProfileImg'
import styles from './JoinTeam.module.scss'

interface Team {
  teamName: string
  teamImg: string
}

const JoinTeam = () => {
  const { code } = useParams()
  const [user] = useRecoilState<User>(userState)
  const [team, setTeam] = useState<Team>({
    teamName: '',
    teamImg: '',
  })
  const [join, setJoin] = useState(false)
  useEffect(() => {
    if (code != undefined) {
      getParticipantsTeam(code).then((response) => {
        if (response.status === 200) {
          const team: Team = {
            teamName: response.data.teamName,
            teamImg: response.data.teamImage,
          }
          setTeam(team)
        } else if (response.code === 'G-031') {
          setJoin(true)
        }
      })
    }
  }, [])

  const handleJoinState = () => {
    if (code != undefined) {
      createParticipantsTeam(code).then((response) => {
        if (response.status === 200) {
          setJoin(true)
        }
      })
    }
  }

  return (
    <div>
      <Navbar />
      <div className={styles.join_team}>
        <div className={styles.title}>{'팀 가입 신청'}</div>
        <div className={styles.team}>
          <ProfileImg imgUrl={team.teamImg} imgName={'팀이미지'} name={'teamdetail'} />
          <p>{team.teamName}</p>
        </div>
        {join === true ? (
          <div className={styles.content}>{'가입 신청된 계정입니다.'}</div>
        ) : team.teamName != '' ? (
          <div className={styles.content}>
            <Button variation={'purple'} onClick={handleJoinState}>
              {'가입 신청'}
            </Button>
          </div>
        ) : (
          <div className={styles.content}>{'없는 팀 정보 입니다.'}</div>
        )}
      </div>
    </div>
  )
}

export default JoinTeam
