import { useState, useEffect } from 'react'
import { ContestData } from '@/types/competition'
import CompetitionCard from '@/components/CompetitionCard/CompetitionCard'
import styles from '@/pages/mypage/competitionlist/CompetitionList.module.scss'
import EmptyImg from '@/components/EmptyImg/EmptyImg'

const CompetitionList = () => {
  const [contestList, setContestList] = useState<ContestData[]>([
    {
      contestId: 0,
      contestTitle: '',
      contestImage: '',
    },
  ])

  useEffect(() => {
    /* 대회 목록 API 호출 */
    const contestDataList = () => [
      {
        contestId: 1,
        contestTitle: '대회1',
        contestImage: '',
      },
      {
        contestId: 2,
        contestTitle: '대회2',
        contestImage: '',
      },
      {
        contestId: 3,
        contestTitle: '대회3',
        contestImage: '',
      },
      {
        contestId: 4,
        contestTitle: '대회4',
        contestImage: '',
      },
      {
        contestId: 5,
        contestTitle: '대회5',
        contestImage: '',
      },
      {
        contestId: 6,
        contestTitle: '대회6',
        contestImage: '',
      },
      {
        contestId: 7,
        contestTitle: '대회7',
        contestImage: '',
      },
      {
        contestId: 8,
        contestTitle: '대회8',
        contestImage: '',
      },
    ]
    setContestList(contestDataList)
  }, [])

  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <div>{'Competition > 신청한 대회'}</div>
      </div>
      {contestList.length > 0 ? (
        <div className={styles.content}>
          <CompetitionCard grid={'grid_3'} state={'participate'} contestList={contestList} />
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyImg text={'대회 목록이 없습니다.'} />
        </div>
      )}
    </div>
  )
}

export default CompetitionList
