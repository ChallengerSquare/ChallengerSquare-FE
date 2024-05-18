import { Dispatch, SetStateAction } from 'react'
import { TeamListResponse } from '@/types/team'
import { useNavigate } from 'react-router-dom'
import Grid from '@/components/Gird/Grid'
import styles from '@/components/TeamCard/TeamCard.module.scss'
import ProfileImg from '../ProfileImg/ProfileImg'

interface TeamCardProps {
  teamlist: TeamListResponse[]
  setId: Dispatch<SetStateAction<number>>
}

const TeamCard = ({ teamlist, setId }: TeamCardProps) => {
  const navigate = useNavigate()
  const handleClick = (id: number) => {
    navigate(`/mypage/teamlist/team/${id}`)
  }

  return (
    <Grid grid={'grid_3'}>
      {teamlist.map((team, index) => (
        <div key={index} className={styles.containter}>
          <div className={styles.team_img}>
            <div className={styles.img}>
              <ProfileImg imgUrl={team.teamImage} imgName={'팀이미지'} name={'teamdetail'} />
            </div>
          </div>
          <div className={styles.team_container}>
            <div className={styles.team_txt}>
              <div className={styles.team_name}>{team.teamName}</div>
              <div className={styles.line}>
                <div>{'인원'}</div>
                <div>{team.teamMemberCount}</div>
              </div>
              <div className={styles.line}>
                <div>{'개최한 대회 수'}</div>
                <div>{team.teamContestCount}</div>
              </div>
              <div className={styles.line}>
                <div>{'참여한 대회 수'}</div>
                <div>{team.teamParticipantsCount}</div>
              </div>
              <div>{'설명'}</div>
              <div className={styles.team_description}>
                {team.teamDescription.length > 55
                  ? `${team.teamDescription.substring(1, 55)}...`
                  : team.teamDescription}
              </div>
            </div>
            <div className={styles.team_btn}>
              <button type={'button'} onClick={() => handleClick(team.teamId)}>
                {'더 보기 ➤'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </Grid>
  )
}

export default TeamCard
