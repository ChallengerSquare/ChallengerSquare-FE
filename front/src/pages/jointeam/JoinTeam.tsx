import styles from '@/pages/jointeam/JoinTeam.module.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '@/stores/userState'
import { User } from '@/types/user'
import Navbar from '@/components/Navbar/Navbar'
import ProfileImg from '@/components/ProfileImg/ProfileImg'
import Button from '@/components/Button/Button'

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
    /* `challengersquare.com/api/team/participants/${code}` GET API 호출 */

    const data = {
      teamName: 'Buzzer Beater',
      teamImg: '',
    }
    setTeam(data)
  }, [])

  const handleJoinState = () => {
    setJoin(true)
    /* `challengersquare.com/api/team/participants` POST API 호출 */
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
          <div className={styles.content}>{'이미 가입 신청된 계정입니다.'}</div>
        ) : (
          <div className={styles.content}>
            <Button variation={'purple'} onClick={handleJoinState}>
              {'가입 신청'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JoinTeam
