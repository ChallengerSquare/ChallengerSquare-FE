import styles from '@/pages/competition-result/CompetitionResult.module.scss'
import Navbar from '@/components/Navbar/Navbar'
import blockchain from '@images/blockchain.jpg'
import SearchBar from '@/components/SearchBar/SearchBar'
import Footer from '@/components/Footer/Footer'
import useScrollTop from '@/hooks/useScrollTop'

const CompetitionResult = () => {
  useScrollTop()
  return (
    <>
      <div className={styles.container}>
        <Navbar enableScrollEffect />
        <div className={styles.body}>
          <img className={styles.background} src={blockchain} alt={'background'} />
          <div className={styles.content}>
            <div className={styles.title}>
              <p>
                <span>블록체인 코드 번호</span>를 통해
              </p>
              <p>참가/내역 조회 찾기</p>
            </div>
            <div className={styles.searchbar}>
              <SearchBar text="블록체인 코드를 입력해주세요." url={'code'} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CompetitionResult
