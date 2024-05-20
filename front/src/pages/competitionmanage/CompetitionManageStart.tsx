import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateCompetitionState, updateCompetitionEnd } from '@services/competition'
import { ContestInfo } from '@/types/competition'
import Button from '@/components/Button/Button'
import styles from './CompetitionManage.module.scss'

interface Award {
  id: number
  name: string
  count: number
}

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
  awardList: Award[]
}

interface Props {
  competition: Competition
  onChangeCompetitionState: (state: string) => void
}

const CompetitionManageStart = ({ competition, onChangeCompetitionState }: Props) => {
  const [competitionData, setCompetitionData] = useState<Competition>(competition)
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])
  const [awardList, setAwardList] = useState<Award[]>([])

  useEffect(() => {
    setCompetitionData(competition)
    setAwardList(competition.awardList)
  }, [competition])

  const toggleExpand = (index: number) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index))
    } else {
      setExpandedIndexes([...expandedIndexes, index])
    }
  }

  // 종료하기 버튼
  const handleStateChange = () => {
    const requestAwardList: ContestInfo[] = competitionData.teamList.map((team: Team) => ({
      teamId: team.id,
      ...(team.award !== 0 && { awardsId: team.award }),
    }))
    updateCompetitionEnd(competition.id, requestAwardList).then((response) => {
      if (response.status === 200) {
        updateCompetitionState(competition.id, 'E').then((response) => {
          onChangeCompetitionState('E')
        })
      }
    })
  }

  // 체크 박스
  const onChangeAttend = (index: number) => {
    setCompetitionData((prevState) => ({
      ...prevState,
      teamList: prevState.teamList.map((team, idx) => {
        if (idx === index) {
          return {
            ...team,
            attend: !team.attend,
          }
        }
        return team
      }),
    }))
  }

  const onChangeAward = (index: number, event: any) => {
    const selectedAwardId = parseInt(event.target.value, 10)
    const previousAwardId = competitionData.teamList[index].award

    setAwardList(
      awardList.map((award) => {
        if (award.id === previousAwardId) {
          return {
            ...award,
            count: award.count + 1,
          }
        }
        if (award.id === selectedAwardId) {
          return {
            ...award,
            count: award.count - 1,
          }
        }
        return award
      }),
    )

    setCompetitionData((prevState) => ({
      ...prevState,
      teamList: prevState.teamList.map((team, idx) => {
        if (idx === index) {
          return {
            ...team,
            award: selectedAwardId,
          }
        }
        return team
      }),
    }))
  }

  const getMaxCount = (awardId: number): boolean => {
    const award = awardList.find((award) => award.id === awardId)
    if (award && award.count > 0) return false
    return true
  }

  return (
    <div>
      <div className={styles.title_container}>
        <div className={styles.title}>{`대회 참가자 현황 (${competition.contestTitle})`}</div>
        <div>
          <Button variation={'purple'} onClick={handleStateChange}>
            {'종료하기'}
          </Button>
        </div>
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
          <div className={styles.content_award}>{'시상(남은개수)'}</div>
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
                <input
                  type={'checkbox'}
                  className={styles.content_attend}
                  checked={team.attend}
                  onChange={() => onChangeAttend(index)}
                />

                <select
                  name="award"
                  id="award"
                  className={styles.content_award}
                  value={team.award || ''}
                  onChange={(event) => onChangeAward(index, event)}
                  disabled={!team.attend}
                >
                  <option value={0}>{'해당없음'}</option>
                  {awardList.map((award) => (
                    <option value={award.id} key={award.id} disabled={getMaxCount(award.id)}>
                      <div>{`${award.name}(${award.count})`}</div>
                    </option>
                  ))}
                </select>

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
                      <span className={styles.content_award}>{''}</span>
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
        {/* <div>
          {awardList.map((awrad) => (
            <div>{awrad.count}</div>
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default CompetitionManageStart
