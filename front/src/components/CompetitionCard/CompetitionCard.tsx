import { Link } from 'react-router-dom'
import { ContestData } from '@/types/competition'
import Grid from '../Gird/Grid'
import styles from './CompetitionCard.module.scss'
import BaseImg from '../BaseImg/BaseImg'

interface CompetitionCardProps {
  grid: string
  state: string
  contestList: ContestData[]
}
const CompetitionCard = ({ grid, state, contestList }: CompetitionCardProps) => {
  return (
    <div>
      <Grid grid={grid}>
        {contestList.map((contest) => (
          <div key={contest.contestId}>
            <div className={styles.contest}>
              {contest.contestTitle.length > 10 ? (
                <p>{contest.contestTitle.substring(0, 9)}...</p>
              ) : (
                <p>{contest.contestTitle}</p>
              )}
              <BaseImg imgUrl={contest.contestImage} imgName={'대회 로고'} variation={'card'} />
            </div>
            <div className={styles.btn}>
              {state === 'create' ? (
                <div className={styles.create}>
                  <Link to={`/competition/detail/${contest.contestId}`} className={styles.left}>
                    {'대회조회'}
                  </Link>
                  <Link to={`/competition/manage/${contest.contestId}`} className={styles.right}>
                    {'대회관리'}
                  </Link>
                </div>
              ) : null}
              {state === 'create' ? <div className={styles.line}>{''}</div> : null}
            </div>
            <div className={styles.btn}>
              {state === 'participate' ? (
                <Link to={`/competition/detail/${contest.contestId}`} className={styles.participate}>
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
