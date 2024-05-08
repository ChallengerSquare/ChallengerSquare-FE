import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'
import CompetitionDetailContent from './CompetitoinDetailContent'
import CompetitionDetailTab from './CompetitionDetailTab'
import styles from './CompetitionDetail.module.scss'

const CompetitionDetail = () => {
  const { competitionId } = useParams()
  const path = process.env.PUBLIC_URL

  useEffect(() => {
    // API 호출 코드 ...
  }, [])

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.full_container}>
          <div className={styles.link_container}>
            <Link to="/competition/search" className={styles.backBtn}>
              <img src={`${path}/svgs/navigate_before.svg`} alt="대회검색" />
              <p>대회 검색하러가기</p>
            </Link>
          </div>
          <div className={styles.content_container}>
            <CompetitionDetailContent competitionId={competitionId} />
          </div>
          <div className={styles.info_container}>
            <CompetitionDetailTab />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitionDetail
