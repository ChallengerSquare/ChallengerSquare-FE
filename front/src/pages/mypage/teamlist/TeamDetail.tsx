import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { teamDetailTapState, teamIdxState } from '@/pages/mypage/store'
import { TeamListData } from '@/types/team'
import TeamContest from '@/pages/mypage/teamlist/TeamContest'
import TeamMember from '@/pages/mypage/teamlist/TeamMember'
import LinkImg from '@svgs/link.svg'
import ProfileImg from '@/components/ProfileImg/ProfileImg'

interface TeamDetailProps {
  teamData: TeamListData
}

const TeamDetail = ({ teamData }: TeamDetailProps) => {
  const [teamDetailTap, setTeamDetailTap] = useRecoilState(teamDetailTapState)
  const [team, setTeam] = useState<TeamListData>(teamData)

  useEffect(() => {
    setTeam(teamData)
  }, [teamData])

  const handleTapState = (state: boolean) => {
    setTeamDetailTap(state)
  }

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('초대 링크가 복사되었습니다.!')
    } catch (error) {
      alert('초대 링크가 복사가 실패하였습니다.')
    }
  }

  return (
    <div className={styles.teamlist}>
      <div className={styles.head}>
        <div>{`Team > 팀목록 > ${team.teamName}`}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.team}>
          <div className={styles.team_logo}>
            <ProfileImg imgUrl={team.teamImg} imgName={'팀이미지'} name={'teamdetail'} edit />
          </div>
          <div className={styles.team_summary}>
            <div>
              <span>{team.teamName}</span>
            </div>
            <div>{team.description}</div>
          </div>
          <div>
            <button
              type={'button'}
              className={styles.team_clipbord}
              onClick={() => handleCopyClipBoard(`${team.teamCode}`)}
            >
              <img src={LinkImg} alt={'대회링크'} />
              <p>{'초대링크'}</p>
            </button>
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
            {teamDetailTap === false ? <TeamContest id={team.teamId} /> : <TeamMember id={team.teamId} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamDetail
