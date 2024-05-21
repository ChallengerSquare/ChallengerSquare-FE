import description from '@images/home/Description1.png'
import styles from '@/pages/home/SectionTwo/HomeSectionTwo.module.scss'

const HomeSectionTwo = () => {
  return (
    <div className={styles.section_container}>
      <div className={styles.left}>
        <img src={description} alt={'설명이미지'} className={styles.poster} />
      </div>
      <div className={styles.right}>
        <span>손쉬운 행사 관리</span>
        <p>행사 참가자를 한 눈에 볼 수 있어요! 결과를 받아서 열심히 다시 정리했던 일은 이젠 안녕!</p>
      </div>
    </div>
  )
}

export default HomeSectionTwo
