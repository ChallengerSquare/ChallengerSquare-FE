import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab/MyPageTab'
import CompetitionList from '@/pages/mypage/participant-list/ParticipantList'
import styles from '@/pages/mypage/MyPage.module.scss'
import Footer from '@/components/Footer/Footer'

const ParticipantListPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab tab={'competitionList'} />
          </div>
          <div className={styles.content_wrap}>
            <CompetitionList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ParticipantListPage
