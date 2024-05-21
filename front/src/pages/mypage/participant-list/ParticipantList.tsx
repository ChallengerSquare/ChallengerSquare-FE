import { useState, useEffect } from 'react'
import { ContestData } from '@/types/competition'
import CompetitionCard from '@/components/CompetitionCard/CompetitionCard'
import styles from '@/pages/mypage/participant-list/ParticipantList.module.scss'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import { getCompetitinoList } from '@services/member'

const ParticipantList = () => {
  const [contestList, setContestList] = useState<ContestData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getCompetitinoList().then(({ data }) => {
      const contestDataList: ContestData[] = data.content
      setContestList(contestDataList)
      setLoading(false)
    })
  }, [])

  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <div>{'Competition > 신청한 대회'}</div>
      </div>
      {loading ? (
        ''
      ) : contestList.length > 0 ? (
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

export default ParticipantList
