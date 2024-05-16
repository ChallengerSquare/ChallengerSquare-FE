import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab'
import MyInfo from '@/pages/mypage/myinfo/MyInfo'
import styles from '@/pages/mypage/MyPage.module.scss'

const TempMyInfo = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab tab={'myInfo'} />
          </div>
          <div className={styles.content_wrap}>
            <MyInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TempMyInfo
