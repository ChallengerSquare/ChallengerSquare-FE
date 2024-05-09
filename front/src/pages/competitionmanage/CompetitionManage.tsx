import { useEffect, useState } from 'react'
import Nav from '@components/Navbar/Navbar'
import CompetitionManageDone from './CompetitionManageDone'
import CompetitionManageEnd from './CompetitionManageEnd'
import styles from './CompetitionManage.module.scss'
import CompetitionManageStart from './CompetitionManageStart'

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

const CompetitionManage = () => {
  const [competitionState, setCompetitionState] = useState<string>('')
  const [competition, setCompetition] = useState<Competition>({
    id: 0,
    contestState: '',
    contestTitle: '',
    teamList: [],
  })
  useEffect(() => {
    console.log('대회 참가자 현황 페이지')
    /*
    // API 호출
    */
    const dumpData: Competition = {
      id: 1,
      contestState: 'DONE',
      contestTitle: '대회이름',
      teamList: [
        {
          id: 1,
          name: 'Team A',
          accept: true,
          attend: true,
          award: 1,
          members: [
            { name: 'John', birthday: '1990-01-01', phone: '123-4567-8901', address: '123 Main St' },
            { name: 'Alice', birthday: '1992-05-15', phone: '234-5678-9012', address: '456 Oak Ave' },
          ],
          reason: '참여하고 싶습니다.',
        },
        {
          id: 2,
          name: 'Team B',
          accept: false,
          attend: true,
          award: 2,
          members: [
            { name: 'Bob', birthday: '1988-03-20', phone: '345-6789-0123', address: '789 Elm St' },
            { name: 'Eva', birthday: '1995-11-10', phone: '456-7890-1234', address: '901 Pine Ave' },
          ],
          reason: '대회 오픈만을 기다렸습니다.',
        },
        {
          id: 3,
          name: 'Team B',
          accept: false,
          attend: true,
          award: 3,
          members: [
            { name: 'Bob', birthday: '1988-03-20', phone: '345-6789-0123', address: '789 Elm St' },
            { name: 'Eva', birthday: '1995-11-10', phone: '456-7890-1234', address: '901 Pine Ave' },
          ],
          reason: '대회 오픈만을 기다렸습니다.',
        },
        {
          id: 4,
          name: 'Team B',
          accept: false,
          attend: false,
          award: 3,
          members: [
            { name: 'Bob', birthday: '1988-03-20', phone: '345-6789-0123', address: '789 Elm St' },
            { name: 'Eva', birthday: '1995-11-10', phone: '456-7890-1234', address: '901 Pine Ave' },
          ],
          reason: '대회 오픈만을 기다렸습니다.',
        },
      ],
    }
    setCompetition(dumpData)
    setCompetitionState(dumpData.contestState)
  }, [])

  useEffect(() => {
    /*
    // API 호출
    */
    console.log('API 재호출')
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
          <span>{competitionState === 'START' ? '진행중' : competitionState === 'END' ? '종료' : ''}</span>
        </div>
        <div className={styles.body}>
          {competitionState === 'START' ? (
            <CompetitionManageStart competition={competition} onChangeCompetitionState={CompetitionStateChange} />
          ) : competitionState === 'END' ? (
            <CompetitionManageEnd competition={competition} onChangeCompetitionState={CompetitionStateChange} />
          ) : (
            <CompetitionManageDone competition={competition} onChangeCompetitionState={CompetitionStateChange} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CompetitionManage
