import EmptyImg from '@/components/EmptyImg/EmptyImg'
import Navbar from '@/components/Navbar/Navbar'
import styles from '@/pages/error/Error.module.scss'

const Error = () => {
  return (
    <div className={styles.container}>
      <Navbar enableScrollEffect />
      <div className={styles.content}>
        <EmptyImg text={'페이지를 찾을 수 없습니다.'} />
      </div>
    </div>
  )
}

export default Error
