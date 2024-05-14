import { useState, useEffect } from 'react'
import styles from '@/pages/mypage/resultlist/ResultList.module.scss'
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
  const [resultList, setResultList] = useState<CompetitionResultList[]>([
    {
      id: 1,
      category: '',
      name: '',
      period: '',
      awardCode: '',
      attendCode: '',
    },
  ])

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
          <div className={styles.awardcode}>{'참가코드'}</div>
          <div className={styles.attendcode}>{'수상코드'}</div>
        </div>
        {resultList.length > 0 ? (
          <div className={styles.body}>
            {resultList.map((result) => (
              <div key={result.id} className={styles.line}>
                <div className={styles.category}>{result.category}</div>
                <Link to={`/competition/detail/${result.id}`} className={styles.name}>
                  <div className={styles.point}>{result.name}</div>
                </Link>
                <div className={styles.period}>{result.period}</div>
                <Link to={`/competition-results/${result.awardCode}`} className={styles.awardcode}>
                  <div className={styles.point}>{result.awardCode}</div>
                </Link>
                <Link to={`/competition-results/${result.attendCode}`} className={styles.attendcode}>
                  <div className={styles.point}>{result.attendCode}</div>
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
