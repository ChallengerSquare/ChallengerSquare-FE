import React, { useState, useEffect } from 'react'
import { getUserList, getContestList, getTeamInfo } from '@services/team'
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
  const [teamInfo, setTeamInfo] = useState<Team>()
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
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.team}>
        <div className={styles.logo}>
          <img src={teamInfo?.teamImage} alt="팀 로고" />
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
        <div className={styles.item_list}>
          {competitionList.map((competition) => (
            <div key={competition.contestId} className={styles.item}>
              <img src={competition.contestImage} alt="대회 이미지" />
              <p>{competition.contestTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompetitionDetailTeam
