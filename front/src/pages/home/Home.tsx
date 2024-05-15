import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { getUser } from '@/services/member'
import Navbar from '@components/Navbar/Navbar'
import { ApiResponse } from '@/types/api'
import title from '../../../public/images/home/home-title.webp'
import description from '../../../public/images/home/description.webp'
import styles from './Home.module.scss'

const Home = () => {
  // const { data, isLoading, isError, error } = useQuery<ApiResponse, AxiosError>('user', getUser)
  // const userData = data
  // console.log(userData?.data)
  // if (isLoading) return <div>loading...</div>
  // if (isError) return <div>error:{error.message}</div>
  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <div className={styles.nav}>
          <Navbar enableScrollEffect />
        </div>
        <div className={styles.title}>
          <img src={title} alt="title" />
        </div>
        <div className={styles.mainDescription}>
          <div>행사 개최, 관리, 참가를 한 곳에서.</div>
          <div>수상, 참가 기록은 블록체인으로 보장해드려요.</div>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.contentContainer}>
          <div className={styles.photo}>
            <img src={description} alt="description" />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>행사 개최</div>
            <div className={styles.contentDescription}>행사를 쉽게 개최하고 관리하세요.</div>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.contentTitle}>행사 개최</div>
            <div className={styles.contentDescription}>행사를 쉽게 개최하고 관리하세요.</div>
          </div>
          <div className={styles.photo}>
            <img src={description} alt="description" />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.photo}>
            <img src={description} alt="description" />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>행사 개최</div>
            <div className={styles.contentDescription}>행사를 쉽게 개최하고 관리하세요.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
