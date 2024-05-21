import { useState, useEffect } from 'react'
import styles from '@/pages/mypage/result-list/ResultList.module.scss'
import { Link } from 'react-router-dom'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import { getResultList } from '@/services/member'

interface CompetitionResultList {
  id: number
  category: string
  name: string
  period: string
  awardCode: string
  attendCode: string
}

interface CompetitionResultBackendList {
  contestId: number
  contestCategory: string
  contestTitle: string
  contestStartDate: string
  contestEndDate: string
  awardCode: string
  participantCode: string
}

const ResultList = () => {
  const [resultList, setResultList] = useState<CompetitionResultList[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getResultList().then(({ data }) => {
      const response = data.content
      const resultListData: CompetitionResultList[] = response.map((element: CompetitionResultBackendList) => ({
        id: element.contestId,
        category: element.contestCategory,
        name: element.contestTitle,
        period: `${element.contestStartDate} ~ ${element.contestEndDate}`,
        awardCode: element.awardCode,
        attendCode: element.participantCode,
      }))
      setResultList(resultListData)
      setLoading(false)
    })
  }, [])

  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <div>{'HOME > 참가한 대회'}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.category}>{'카테고리'}</div>
          <div className={styles.name}>{'대회명'}</div>
          <div className={styles.period}>{'대회기간'}</div>
          <div className={styles.attendcode}>{'참가코드'}</div>
          <div className={styles.awardcode}>{'수상코드'}</div>
        </div>
        {loading ? (
          ''
        ) : resultList.length > 0 ? (
          <div className={styles.body}>
            {resultList.map((result) => (
              <div key={result.id} className={styles.line}>
                <div className={styles.category}>{result.category}</div>
                <Link to={`/competition/detail/${result.id}`} className={styles.name}>
                  <div>
                    <span>{result.name}</span>
                  </div>
                </Link>
                <div className={styles.period}>{result.period}</div>
                <Link to={`/competition-results/code/${result.attendCode}`} className={styles.attendcode}>
                  <div>
                    {/* {result.awardCode.length > 20 ? `${result.attendCode.substring(1, 20)}...` : result.attendCode} */}
                    <span>{result.awardCode}</span>
                  </div>
                </Link>
                <Link to={`/competition-results/code/${result.awardCode}`} className={styles.awardcode}>
                  <div>
                    <span>{result.attendCode}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <EmptyImg text={'참가한 대회가 없습니다.'} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultList
