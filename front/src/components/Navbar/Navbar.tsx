import { Link } from 'react-router-dom'
import useNavbarScroll from '@hooks/useNavbarScroll'
import Button from '@components/Button/Button'
import styles from './Navbar.module.scss'

interface NavbarProps {
  enableScrollEffect?: boolean
}

const Navbar = ({ enableScrollEffect = false }: NavbarProps) => {
  // 로고의 경로를 설정합니다. 이 경로는 public 폴더를 기준으로 합니다.
  const challS = `${process.env.PUBLIC_URL}/svgs/challS.svg`
  const navbarScroll = useNavbarScroll(enableScrollEffect)
  return (
    <header className={styles.header} style={{ backgroundColor: navbarScroll }}>
      <div className="header container mx-auto flex justify-between items-center">
        <div className="flex items-center text-xl">
          <Link to="/">
            <img src={challS} alt="renewal" className={styles.logo} />
          </Link>
        </div>
        <nav>
          <Link to="/competition" className={styles.link}>
            대회
          </Link>
          <Link to="/competition-results" className={styles.link}>
            수상/참가 내역 조회
          </Link>
        </nav>
        <Link to="/sign-in">
          <Button variation="purple" className={styles.login}>
            로그인
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
