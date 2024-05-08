import { useState } from 'react'
import CompetitionDetailInfo from './CompetitionDetailInfo'
import CompetitionDetailNotice from './CompetitionDetailNotice'
import CompetitionDetailQA from './CompetitionDetailQA'
import CompetitionDetailTeam from './CompetitionDetailTeam'
import styles from './CompetitionDetailTab.module.scss'

const CompetitionDetailTab = () => {
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
        {activeTab === 'info' && <CompetitionDetailInfo />}
        {activeTab === 'notice' && <CompetitionDetailNotice />}
        {activeTab === 'qa' && <CompetitionDetailQA />}
        {activeTab === 'team' && <CompetitionDetailTeam />}
      </div>
    </div>
  )
}

export default CompetitionDetailTab
