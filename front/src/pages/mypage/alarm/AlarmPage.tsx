import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/tab/Tab'
import styles from '@/pages/mypage/MyPage.module.scss'
import Alarm from '@/pages/mypage/alarm/Alarm'
import Footer from '@/components/Footer/Footer'

const TempAlarm = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab tab={'alarm'} />
          </div>
          <div className={styles.content_wrap}>
            <Alarm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TempAlarm
