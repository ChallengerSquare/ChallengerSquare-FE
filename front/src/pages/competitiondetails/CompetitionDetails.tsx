import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCompetitionDetails } from '@services/competition'
import { Contest } from '@/types/competition'
import useScrollTop from '@/hooks/useScrollTop'
import BeforeNav from '@assets/svgs/arrow/navigate_before.svg'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import Info from '@pages/competitiondetails/Info/Info'
import CompetitionDetailTab from './CompetitionDetailTab/CompetitionDetailTab'
import styles from './CompetitionDetails.module.scss'

const CompetitionDetails = () => {
  useScrollTop()
  const { competitionId } = useParams<{ competitionId: string }>()
  const [competition, setCompetition] = useState<Contest>()

  useEffect(() => {
    if (competitionId != null) {
      getCompetitionDetails(competitionId).then(({ data }) => {
        console.log(data)
        setCompetition(data)
      })
    }
  }, [competitionId])

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
          <div className={styles.content_container}>{competition && <Info competition={competition} />}</div>
          <div className={styles.info_container}>
            {competition && (
              <CompetitionDetailTab
                contestId={competition.contestId}
                teamId={competition.teamId}
                content={competition.contestContent}
                isOwnerTeamMember={competition.isOwnerTeamMember}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CompetitionDetails
