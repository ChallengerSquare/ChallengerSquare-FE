import { Link } from 'react-router-dom'
import styles from '@/pages/home/home-section1/HomeSectionOne.module.scss'
import Logo from '@images/home/home-title.webp'

const HomeSectionOne = () => {
  return (
    <div className={styles.section_container}>
      <img src={Logo} alt="title" className={styles.logo} />
      <p>
        행사 개최, 관리, 참가를 <span>한 곳</span>에서.
      </p>
      <p>
        수상, 참가 기록은 <span>블록체인</span>으로 보장해드려요.
      </p>
      <div className={styles.link_container}>
        <Link to={'/competition/search'}>
          <div className={styles.box}>
            <p>참여하기</p>
          </div>
        </Link>
        <Link to={'/competition-results'}>
          <div className={styles.box}>
            <p>조회하기</p>
          </div>
        </Link>
        <Link to={'/create-competition'}>
          <div className={styles.box}>
            <p>개최하기</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HomeSectionOne
