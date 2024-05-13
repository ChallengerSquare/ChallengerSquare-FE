import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { teamDetailTapState } from '@/pages/mypage/store'
import { TeamData } from '@/types/team'
import Image from '@/components/Image/image'
import TeamContest from '@/pages/mypage/teamlist/TeamContest'
import TeamMember from '@/pages/mypage/teamlist/TeamMember'

interface TeamDetailProps {
  teamData: TeamData
}

const TeamDetail = ({ teamData }: TeamDetailProps) => {
  const [teamDetailTap, setTeamDetailTap] = useRecoilState(teamDetailTapState)
  const [team, setTeam] = useState(teamData)

  useEffect(() => {
    setTeam(teamData)
    console.log(teamData)
  }, [teamData])

  const handleTapState = (state: boolean) => {
    setTeamDetailTap(state)
  }

  return (
    <div className={styles.teamlist}>
      <div className={styles.head}>
        <div>{`Team > 팀목록 > ${team.name}`}</div>
        <button type={'button'} className={styles.btn}>
          {'+ 팀 생성하기'}
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.team}>
          <div className={styles.team_logo}>
            <Image imgUrl={team.img} imgName={'팀이미지'} name={'teamdetail'} edit />
          </div>
          <div className={styles.team_summary}>
            <div>
              <span>{team.name}</span>
            </div>
            <div>{team.description}</div>
          </div>
        </div>
        <div className={styles.team_content}>
          <div className={styles.tap}>
            <button
              type={'button'}
              className={`${styles.tap} ${teamDetailTap === false ? styles.active : ''}`}
              onClick={() => handleTapState(false)}
              disabled={teamDetailTap === false}
            >
              {'개최 대회'}
            </button>
            <button
              type={'button'}
              className={`${styles.tap} ${teamDetailTap === true ? styles.active : ''}`}
              onClick={() => handleTapState(true)}
              disabled={teamDetailTap === true}
            >
              {'인원'}
            </button>
          </div>
          <div className={styles.content}>
            {teamDetailTap === false ? <TeamContest id={team.id} /> : <TeamMember id={team.id} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamDetail
