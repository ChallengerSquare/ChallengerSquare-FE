import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab/MyPageTab'
import styles from '@/pages/mypage/MyPage.module.scss'
import Setting from '@/pages/mypage/setting/Setting'

const TempSetting = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab tab={'setting'} />
          </div>
          <div className={styles.content_wrap}>
            <Setting />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TempSetting
