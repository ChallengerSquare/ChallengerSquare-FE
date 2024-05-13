import CompetitionCard from '@/components/CompetitionCard/CompetitionCard'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { ContestData } from '@/types/competition'
import { useEffect, useState } from 'react'

interface TeamContestProps {
  id: number
}

const TeamContest = ({ id }: TeamContestProps) => {
  const [contestList, setContestList] = useState<ContestData[]>([
    {
      contestId: 0,
      contestTitle: '',
      contestImage: '',
    },
  ])
  useEffect(
    /* 대회 목록 조회 API 호출 */
    () => {
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
    },
    [],
  )

  return (
    <div>
      {contestList.length ? (
        <CompetitionCard grid={'grid_3'} state={'create'} contestList={contestList} />
      ) : (
        <EmptyImg text={'개최 대회가 없습니다.'} />
      )}
    </div>
  )
}

export default TeamContest
