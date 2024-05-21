import { useEffect, useState } from 'react'
import { getTeamList } from '@services/competition'
import { useParams } from 'react-router-dom'
import Nav from '@components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import CompetitionManageDone from './CompetitionDone'
import CompetitionManageEnd from './CompetitionEnd'
import styles from './ManageCompetition.module.scss'
import CompetitionManageStart from './CompetitionStart'

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

interface MemberBack {
  memberName: string
  memberBirth: string
  memberPhone: string
  memberAddress: string
  isLeader: boolean
}

interface TeamBack {
  teamId: number
  teamName: string
  teamMembers: MemberBack[]
  contestParticipantsState: string
  isParticipants: boolean
  contestParticipantsReason: string
}

interface CompetitionBack {
  contestId: number
  contestTitle: string
  contestState: string
  teamInfo: TeamBack[]
  awards: Awards[]
}

interface Awards {
  awardsId: number
  awardsName: string
  awardsCount: number
  awardsPrize: number
}

interface Award {
  id: number
  name: string
  count: number
}

const ManageCompetition = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [competitionState, setCompetitionState] = useState<string>('')
  const [competition, setCompetition] = useState<Competition>({
    id: 0,
    contestState: '',
    contestTitle: '',
    teamList: [],
    awardList: [],
  })
  const { competitionId } = useParams<{ competitionId: string }>()
  const competitionIdNumber: number | undefined = competitionId ? parseInt(competitionId, 10) : undefined
  const getList = () => {
    if (competitionIdNumber != undefined) {
      getTeamList(competitionIdNumber).then(({ data }) => {
        if (data != null) {
          const response: CompetitionBack = data

          const competition: Competition = {
            id: response.contestId,
            contestState: response.contestState,
            contestTitle: response.contestTitle,
            teamList: response.teamInfo.map((element: TeamBack) => ({
              id: element.teamId,
              name: element.teamName,
              accept: element.contestParticipantsState === 'A',
              attend: element.isParticipants,
              award: 0,
              reason: element.contestParticipantsReason,
              members: element.teamMembers.map((member: MemberBack) => ({
                name: member.memberName,
                birthday: member.memberBirth,
                phone: member.memberPhone,
                address:
                  member.memberAddress != null
                    ? member.memberAddress.split(' ').slice(1, 3).join(' ')
                    : member.memberAddress,
              })),
            })),
            awardList: response.awards.map((data) => ({
              id: data.awardsId,
              name: data.awardsName,
              count: data.awardsCount,
            })),
          }
          setCompetition(competition)
          setCompetitionState(response.contestState)
          setLoading(false)
        }
      })
    }
  }
  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    getList()
  }, [competitionState])

  const CompetitionStateChange = (state: string) => {
    setCompetitionState(state)
  }

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <div className={styles.header}>
          <p>{'대회 관리'}</p>
          <span>{competitionState === 'S' ? '진행중' : competitionState === 'E' ? '종료' : ''}</span>
        </div>
        <div className={styles.body}>
          {competitionState === 'S' ? (
            <CompetitionManageStart competition={competition} onChangeCompetitionState={CompetitionStateChange} />
          ) : competitionState === 'E' ? (
            <CompetitionManageEnd competition={competition} onChangeCompetitionState={CompetitionStateChange} />
          ) : (
            <CompetitionManageDone
              loading={loading}
              competition={competition}
              onChangeCompetitionState={CompetitionStateChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ManageCompetition
