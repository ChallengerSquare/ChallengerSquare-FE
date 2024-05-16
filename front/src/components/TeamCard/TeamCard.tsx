import { useEffect, useState } from 'react'
import { TeamListData } from '@/types/team'
import baseImg from '@images/baseImg.png'
import Grid from '@/components/Gird/Grid'
import styles from '@/components/TeamCard/TeamCard.module.scss'

interface TeamCardProps {
  team: TeamListData[]
  onClick: (idx: number) => void
}

const TeamCard = ({ team, onClick }: TeamCardProps) => {
  const [teamList, setTeamList] = useState<TeamListData[]>(team)

  useEffect(() => {
    setTeamList(team)
  }, [team])

  return (
    <Grid grid={'grid_3'}>
      {teamList.map((team, index) => (
        <div key={index} className={styles.containter}>
          <div className={styles.team_img}>
            <img src={team.teamImg === '' ? baseImg : team.teamImg} alt="팀이미지" />
          </div>
          <div className={styles.team_container}>
            <div className={styles.team_txt}>
              <div className={styles.team_name}>{team.teamName}</div>
              <div className={styles.line}>
                <div>{'인원'}</div>
                <div>{team.teamMember}</div>
              </div>
              <div className={styles.line}>
                <div>{'개최한 대회 수'}</div>
                <div>{team.createContest}</div>
              </div>
              <div className={styles.line}>
                <div>{'개최한 대회 수'}</div>
                <div>{team.participateContest}</div>
              </div>
              <div>{'설명'}</div>
              <div className={styles.team_description}>
                {team.description.length > 55 ? `${team.description.substring(1, 55)}...` : team.description}
              </div>
            </div>
            <div className={styles.team_btn}>
              <button type={'button'} onClick={() => onClick(index)}>
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
