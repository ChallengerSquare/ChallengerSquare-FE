import description from '@images/home/Description3.png'
import styles from '@/pages/home/home-section4/HomeSectionFour.module.scss'

const HomeSectionFour = () => {
  return (
    <div className={styles.section_container}>
      <div className={styles.left}>
        <img src={description} alt={'설명이미지'} className={styles.poster} />
      </div>
      <div className={styles.right}>
        <span>블록체인 기록 보장</span>
        <p>수상, 참가 기록은 블록체인에 저장해요! 수상, 참가 내역을 스펙으로 사용하세요!</p>
      </div>
    </div>
  )
}

export default HomeSectionFour
