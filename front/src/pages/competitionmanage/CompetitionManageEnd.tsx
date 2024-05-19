import { useState, useEffect } from 'react'
import styles from './CompetitionManage.module.scss'

interface Member {
  name: string
  birthday: string
  phone: string
  address: string
}

interface Team {
  id: number
  name: string
  accept: boolean
  attend: boolean
  award: number
  reason: string
  members: Member[]
}

interface Competition {
  id: number
  contestState: string // DONE, START, END
  contestTitle: string
  teamList: Team[]
}

interface Props {
  competition: Competition
  onChangeCompetitionState: (state: string) => void
}

const CompetitionManageEnd = ({ competition, onChangeCompetitionState }: Props) => {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])
  const [competitionData, setCompetitionData] = useState<Competition>(competition)

  useEffect(() => {
    setCompetitionData(competition)
  }, [competition])

  const toggleExpand = (index: number) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index))
    } else {
      setExpandedIndexes([...expandedIndexes, index])
    }
  }

  return (
    <div>
      <div className={styles.title_container}>
        <div className={styles.title}>{`대회 참가자 현황 (${competition.contestTitle})`}</div>
      </div>
      <div className={styles.content_container}>
        <div className={styles.content_title}>
          <div className={styles.content_index}>{'순번'}</div>
          <div className={styles.content_classify}>{'분류'}</div>
          <div className={styles.content_name}>{'이름'}</div>
          <div className={styles.content_birth}>{'생년월일'}</div>
          <div className={styles.content_phone}>{'대표 연락처'}</div>
          <div className={styles.content_address}>{'주소'}</div>
          <div className={styles.content_attend}>{'참가'}</div>
          {/* <div className={styles.content_award}>{'시상'}</div> */}
          <div className={styles.content_btn}>{''}</div>
        </div>
        <div className={styles.content_teamlist}>
          {competitionData.teamList.map((team, index) => (
            <div className={styles.content_team} key={index}>
              <div className={styles.content_info}>
                <span className={styles.content_index}>{index + 1}</span>
                <span className={styles.content_classify}>{team.name}</span>
                <span className={styles.content_name}>{team.members[0].name}</span>
                <span className={styles.content_birth}>{team.members[0].birthday}</span>
                <span className={styles.content_phone}>{team.members[0].phone}</span>
                <span className={styles.content_address}>{team.members[0].address}</span>
                <span className={styles.content_attend}>{team.attend ? '참석' : '-'}</span>
                {/* <span className={styles.content_award}>{team.award}</span> */}
                <div className={styles.content_btn} role={'button'} tabIndex={0} onClick={() => toggleExpand(team.id)}>
                  {expandedIndexes.includes(team.id) ? '▲' : '▼'}
                </div>
              </div>
              {expandedIndexes.includes(team.id) && (
                <div className={styles.content_members}>
                  {team.members.map((member, index) => (
                    <div className={styles.content_member} key={index}>
                      <span className={styles.content_index}>{''}</span>
                      <span className={styles.content_classify}>{''}</span>
                      <span className={styles.content_name}>{member.name}</span>
                      <span className={styles.content_birth}>{member.birthday}</span>
                      <span className={styles.content_phone}>{member.phone}</span>
                      <span className={styles.content_address}>{member.address}</span>
                      <span className={styles.content_attend}>{''}</span>
                      {/* <span className={styles.content_award}>{''}</span> */}
                      <span className={styles.content_btn}>{''}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.content_reason}>
                <p>{'신청사유'}</p>
                <span>{team.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CompetitionManageEnd
