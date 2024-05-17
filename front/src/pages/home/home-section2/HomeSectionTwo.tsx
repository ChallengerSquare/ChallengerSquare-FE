import description from '@images/home/description.webp'
import styles from '@/pages/home/home-section2/HomeSectionTwo.module.scss'

const HomeSectionTwo = () => {
  return (
    <div className={styles.section_container}>
      <div className={styles.left}>
        <img src={description} alt={'설명이미지'} className={styles.poster} />
      </div>
      <div className={styles.right}>
        <span>손쉬운 행사 관리</span>
        <p>행사를 쉽게 관리해보세요!</p>
      </div>
    </div>
  )
}

export default HomeSectionTwo
