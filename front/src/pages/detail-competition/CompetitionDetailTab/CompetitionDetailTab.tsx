import { useEffect, useState } from 'react'
import Notice from '@pages/detail-competition/Notice/Notice'
import Promotion from '@pages/detail-competition/Promotion/Promotion'
import QnA from '@pages/detail-competition/QnA/QnA'
import HostTeam from '@pages/detail-competition/HostTeam/HostTeam'
import styles from './CompetitionDetailTab.module.scss'

interface Props {
  contestId: number
  teamId: number
  content: string | undefined
  isOwnerTeamMember: boolean
}

const CompetitionDetailTab = ({ contestId, teamId, content, isOwnerTeamMember }: Props) => {
  const [activeTab, setActiveTab] = useState('info')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    setActiveTab('info')
  }, [contestId])

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
        {activeTab === 'info' && (
          <Promotion content={content} isOwnerTeamMember={isOwnerTeamMember} contestId={contestId} />
        )}
        {activeTab === 'notice' && <Notice contestId={contestId} isOwnerTeamMember={isOwnerTeamMember} />}
        {activeTab === 'qa' && <QnA contestId={contestId} isOwnerTeamMember={isOwnerTeamMember} />}
        {activeTab === 'team' && teamId != undefined && <HostTeam teamId={teamId} />}
      </div>
    </div>
  )
}

export default CompetitionDetailTab
