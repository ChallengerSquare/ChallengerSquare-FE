import { Link } from 'react-router-dom'
import styles from '@/pages/home/SectionFive/HomeSectionFive.module.scss'
import Footer from '@/components/Footer/Footer'

const HomeSectionFive = () => {
  return (
    <div className={styles.section_container}>
      <div className={styles.container}>
        <Link to={'/competition'} className={styles.link}>
          <div className={styles.box}>
            <p>지금 시작하기</p>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default HomeSectionFive
