import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab'
import ResultList from '@/pages/mypage/resultlist/ResultList'
import styles from '@/pages/mypage/MyPage.module.scss'

const TempResultList = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab tab={'resultList'} />
          </div>
          <div className={styles.content_wrap}>
            <ResultList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TempResultList
