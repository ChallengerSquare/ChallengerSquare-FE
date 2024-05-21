import { Link } from 'react-router-dom'
import styles from '@pages/mypage/MyPage.module.scss'

interface MyPageTapParams {
  tab: string
}

const MyPageTap = ({ tab }: MyPageTapParams) => {
  return (
    <>
      <div className={styles.taplist}>
        <div className={styles.home}>
          <div className={styles.title}>{'Home'}</div>
          <div className={styles.content}>
            <Link to="/mypage/myinfo" className={tab === 'myInfo' ? styles.active : styles.inactive}>
              {'내 정보'}
            </Link>
            <Link to="/mypage/alarm" className={tab === 'alarm' ? styles.active : styles.inactive}>
              {'알림'}
            </Link>
          </div>
        </div>
        <div className={styles.team}>
          <div className={styles.title}>{'Team'}</div>
          <div className={styles.content}>
            <Link to="/mypage/teamlist" className={tab === 'teamList' ? styles.active : styles.inactive}>
              {'팀 목록'}
            </Link>
          </div>
        </div>
        <div className={styles.competition}>
          <div className={styles.title}>{'Competition'}</div>
          <div className={styles.content}>
            <Link to="/mypage/competitionlist" className={tab === 'competitionList' ? styles.active : styles.inactive}>
              {'신청한 대회'}
            </Link>
            <Link to="/mypage/resultlist" className={tab === 'resultList' ? styles.active : styles.inactive}>
              {'참가한 대회'}
            </Link>
          </div>
        </div>
        {/* <div className={styles.competition}>
        <div className={styles.title}>{'Setting'}</div>
        <div className={styles.content}>
        <Link to="/mypage/setting" className={tab === 'setting' ? styles.active : styles.inactive}>
        {'환경설정'}
        </Link>
        </div>
      </div> */}
      </div>
    </>
  )
}

export default MyPageTap
