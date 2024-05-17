import { useState } from 'react'
import CompetitionDetailInfo from './CompetitionDetailInfo'
import CompetitionDetailNotice from './competitiondetailnotice/CompetitionDetailNotice'
import CompetitionDetailQA from './competitiondetailqa/CompetitionDetailQA'
import CompetitionDetailTeam from './competitiondetailteam/CompetitionDetailTeam'
import styles from './CompetitionDetailTab.module.scss'

interface Props {
  contestId: number
  teamId: number
  content: string | undefined
}

const CompetitionDetailTab = ({ contestId, teamId, content }: Props) => {
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
        {activeTab === 'info' && <CompetitionDetailInfo content={content} />}
        {activeTab === 'notice' && <CompetitionDetailNotice contestId={contestId} />}
        {activeTab === 'qa' && <CompetitionDetailQA />}
        {activeTab === 'team' && teamId != undefined && <CompetitionDetailTeam teamId={teamId} />}
      </div>
    </div>
  )
}

export default CompetitionDetailTab
