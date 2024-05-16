import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContestData } from '@/types/competition'
import baseImg from '@images/baseImg.png'
import Grid from '../Gird/Grid'
import styles from './CompetitionCard.module.scss'

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
              <p>{contest.contestTitle}</p>
              <img
                src={contest.contestImage === '' || contest.contestImage === null ? baseImg : contest.contestImage}
                alt="대회 로고"
              />
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
