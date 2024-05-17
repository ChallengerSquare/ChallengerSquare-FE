import description from '@images/home/description.webp'
import styles from '@/pages/home/home-section4/HomeSectionFour.module.scss'

const HomeSectionFour = () => {
  return (
    <div className={styles.section_container}>
      <div className={styles.left}>
        <img src={description} alt={'설명이미지'} className={styles.poster} />
      </div>
      <div className={styles.right}>
        <span>블록체인 기록 보장</span>
        <p>수상, 참가 기록은 블록체인으로 보장해드려요!</p>
      </div>
    </div>
  )
}

export default HomeSectionFour
