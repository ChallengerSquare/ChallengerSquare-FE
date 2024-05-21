import CompetitionCard from '@/components/CompetitionCard/CompetitionCard'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import { ContestData } from '@/types/competition'
import { useEffect, useState } from 'react'
import { getContestList } from '@services/team'
import { useParams } from 'react-router-dom'

const TeamContest = () => {
  const { teamId } = useParams()
  const [contestList, setContestList] = useState<ContestData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (teamId) {
      const id = parseInt(teamId, 10)
      getContestList(id)
        .then(({ data }) => {
          setContestList(data.content)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <div>
      {loading ? (
        ''
      ) : contestList.length ? (
        <CompetitionCard grid={'grid_3'} state={'create'} contestList={contestList} />
      ) : (
        <EmptyImg text={'개최 대회가 없습니다.'} />
      )}
    </div>
  )
}

export default TeamContest
