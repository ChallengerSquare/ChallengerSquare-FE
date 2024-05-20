import { useState, useEffect } from 'react'
import { getUserList, getContestList, getTeamInfo } from '@services/team'
import CompetitionCard from '@/components/CompetitionCard/CompetitionCard'
import BaseImg from '@/components/BaseImg/BaseImg'
import styles from './CompetitionDetailTeam.module.scss'

interface Props {
  teamId: number
}

interface Member {
  memberName: string
}

interface Team {
  teamName: string
  teamImage: string
  teamDescription: string
}

interface Competition {
  contestId: number
  contestImage: string
  contestTitle: string
}

const CompetitionDetailTeam = ({ teamId }: Props) => {
  const [memberList, setMemberList] = useState<Member[]>([])
  const [teamInfo, setTeamInfo] = useState<Team>({
    teamName: '',
    teamImage: '',
    teamDescription: '',
  })
  const [competitionList, setCompetitionList] = useState<Competition[]>([])
  useEffect(() => {
    getTeamInfo(teamId).then(({ data }) => {
      setTeamInfo(data)
    })
    getUserList(teamId).then(({ data }) => {
      setMemberList(data)
    })
    getContestList(teamId).then(({ data }) => {
      const response: Competition[] = data.content
      setCompetitionList(response)
    })
    console.log(competitionList)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.team}>
        <div className={styles.logo}>
          <BaseImg imgUrl={teamInfo.teamImage} imgName={'대회 이미지'} />
        </div>
        <div className={styles.teamInfo}>
          <div className={styles.teamName}>{teamInfo?.teamName}</div>
          <div className={styles.teamDescription}>{teamInfo?.teamDescription}</div>
        </div>
      </div>
      <div className={styles.member}>
        <div className={styles.title}>팀 인원</div>
        <div className={styles.person_list}>
          {memberList.map((member, index) => (
            <div key={index} className={styles.person}>
              <p>{member.memberName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.competition}>
        <div className={styles.title}>개최대회</div>
        <CompetitionCard grid={'grid_3'} state={'participate'} contestList={competitionList} />
      </div>
    </div>
  )
}

export default CompetitionDetailTeam
