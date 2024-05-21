import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab/MyPageTab'
import styles from '@/pages/mypage/MyPage.module.scss'
import TeamList from '@/pages/mypage/teams/list/TeamList'
import Footer from '@/components/Footer/Footer'

const TeamListPage = () => {
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
            <TeamList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TeamListPage
