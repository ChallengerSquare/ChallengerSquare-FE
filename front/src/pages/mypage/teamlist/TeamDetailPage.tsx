import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab'
import styles from '@/pages/mypage/MyPage.module.scss'
import Footer from '@/components/Footer/Footer'
import TeamDetail from '@/pages/mypage/teamlist/TeamDetail'

const TeamDetailPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab tab={'teamList'} />
          </div>
          <div className={styles.content_wrap}>
            <TeamDetail />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TeamDetailPage
