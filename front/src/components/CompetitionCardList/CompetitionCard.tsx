import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contestData } from '@/types/competition'
import Grid from '../Gird/Grid'
import styles from './CompetitionCard.module.scss'

interface CompetitionCardProps {
  grid: string
  state: string
  contestList: contestData[]
}
const CompetitionCard = ({ grid, state, contestList }: CompetitionCardProps) => {
  return (
    <div>
      <Grid grid={grid}>
        {contestList.map((contestList) => (
          <div key={contestList.contestId}>
            <div className={styles.contest}>
              <p>{contestList.contestTitle}</p>
              <img
                src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-11-%EC%98%A4%EC%A0%84-12.29.48.png"
                alt="대회 로고"
              />
            </div>
            <div className={styles.btn}>
              {state === 'create' ? (
                <div className={styles.create}>
                  <Link to={`/competition/detail/${contestList.contestId}`} className={styles.left}>
                    {'대회조회'}
                  </Link>
                  <Link to={`/competition/manage/${contestList.contestId}`} className={styles.right}>
                    {'대회관리'}
                  </Link>
                </div>
              ) : null}
              {state === 'create' ? <div className={styles.line}>{''}</div> : null}
            </div>
            <div className={styles.btn}>
              {state === 'participate' ? (
                <Link to={`/competition/detail/${contestList.contestId}`} className={styles.participate}>
                  {'대회조회'}
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </Grid>
    </div>
  )
}

export default CompetitionCard
