import logo from '@images/logo/footerLogo.webp'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.information}>
          <div className={styles.team}>Created by Team Buzzer Beater: 안준현 강다솔 강태연 김재윤 남혜미 이성목</div>
          <div className={styles.address}>서울특별시 강남구 테헤란로 212 멀티캠퍼스 802호</div>
        </div>
        <div className={styles.copy}>
          <div className={styles.copyright}>Copyright © Buzzer Beater All Rights Reserved</div>
          <div className={styles.powered}>Powered by SSAFY</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
