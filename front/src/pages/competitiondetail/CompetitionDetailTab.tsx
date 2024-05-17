import { useState } from 'react'
import CompetitionDetailInfo from './competitiondetailinfo/CompetitionDetailInfo'
import CompetitionDetailNotice from './competitiondetailnotice/CompetitionDetailNotice'
import CompetitionDetailQA from './competitiondetailqna/CompetitionDetailQnA'
import CompetitionDetailTeam from './competitiondetailteam/CompetitionDetailTeam'
import styles from './CompetitionDetailTab.module.scss'

interface Props {
  contestId: number
  teamId: number
  content: string | undefined
  isLeader: boolean
}

const CompetitionDetailTab = ({ contestId, teamId, content, isLeader }: Props) => {
  const [activeTab, setActiveTab] = useState('info')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div>
      <div className={styles.tab_menu}>
        <button
          type="button"
          onClick={() => handleTabClick('info')}
          className={activeTab === 'info' ? styles.active : styles.inactive}
        >
          상세 정보
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('notice')}
          className={activeTab === 'notice' ? styles.active : styles.inactive}
        >
          공지사항
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('qa')}
          className={activeTab === 'qa' ? styles.active : styles.inactive}
        >
          Q&A
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('team')}
          className={activeTab === 'team' ? styles.active : styles.inactive}
        >
          주최측
        </button>
      </div>

      {/* 선택된 탭에 따라 해당 컴포넌트를 렌더링 */}
      <div className={styles.tab_content}>
        {activeTab === 'info' && <CompetitionDetailInfo isLeader={isLeader} content={content} />}
        {activeTab === 'notice' && <CompetitionDetailNotice isLeader={isLeader} contestId={contestId} />}
        {activeTab === 'qa' && <CompetitionDetailQA isLeader={isLeader} contestId={contestId} />}
        {activeTab === 'team' && teamId != undefined && <CompetitionDetailTeam teamId={teamId} />}
      </div>
    </div>
  )
}

export default CompetitionDetailTab
