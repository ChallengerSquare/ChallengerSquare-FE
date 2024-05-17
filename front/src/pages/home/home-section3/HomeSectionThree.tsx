import description from '@images/home/description.webp'
import styles from '@/pages/home/home-section3/HomeSectionThree.module.scss'

const HomeSectionThree = () => {
  return (
    <div className={styles.section_container}>
      <div className={styles.right}>
        <span>손쉬운 참가</span>
        <p>행사에 참가하기 쉽게!</p>
      </div>
      <div className={styles.left}>
        <img src={description} alt={'설명이미지'} className={styles.poster} />
      </div>
    </div>
  )
}

export default HomeSectionThree
