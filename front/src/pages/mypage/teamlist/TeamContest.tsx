import CompetitionCard from '@/components/CompetitionCard/CompetitionCard'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { ContestData } from '@/types/competition'
import { useEffect, useState } from 'react'
import { getContestList } from '@services/team'

interface TeamContestProps {
  id: number
}

const TeamContest = ({ id }: TeamContestProps) => {
  const [contestList, setContestList] = useState<ContestData[]>([])
  useEffect(() => {
    getContestList(id).then(({ data }) => {
      setContestList(data.content)
    })
  }, [])

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
