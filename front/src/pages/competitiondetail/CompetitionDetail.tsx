import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCompetitionDetails } from '@services/contest'
import BeforeNav from '@svgs/navigate_before.svg'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import CompetitionDetailContent from './CompetitionDetailContent'
import CompetitionDetailTab from './CompetitionDetailTab'
import styles from './CompetitionDetail.module.scss'

interface Contest {
  contestId: number
  contestTitle: string
  contestContent: string
  contestImage: string
  teamName: string
  teamId: number
  registrationPeriod: {
    start: string
    end: string
  }
  contestPeriod: {
    start: string
    end: string
  }
  contestRegistrationNum: number
  contestFee: number
  contestPhone: string
  isPriority: boolean
  contestCategory: string
  contestLocation: string
  isLeader: boolean
  participantState: string
  contestState: string
  contestAwards: Award[]
}

interface Award {
  awardsId: number
  awardsName: string
  awardsCount: number
  awardsPrize: number
}

const CompetitionDetail = () => {
  const { competitionId } = useParams<{ competitionId: string }>()
  const [competition, setCompetition] = useState<Contest>()

  useEffect(() => {
    if (competitionId != null) {
      getCompetitionDetails(competitionId).then(({ data }) => {
        console.log(data)
        setCompetition(data)
      })
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.full_container}>
          <div className={styles.link_container}>
            <Link to="/competition/search" className={styles.backBtn}>
              <img src={BeforeNav} alt="대회검색" />
              <p>대회 검색하러가기</p>
            </Link>
          </div>
          <div className={styles.content_container}>
            {competition && <CompetitionDetailContent competition={competition} />}
          </div>
          <div className={styles.info_container}>
            {competition && (
              <CompetitionDetailTab
                contestId={competition.contestId}
                teamId={competition.teamId}
                content={competition.contestContent}
                isLeader={competition.isLeader}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CompetitionDetail
