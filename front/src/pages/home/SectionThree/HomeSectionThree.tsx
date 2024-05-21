import description from '@images/home/Description2.png'
import styles from '@/pages/home/SectionThree/HomeSectionThree.module.scss'

const HomeSectionThree = () => {
  return (
    <div className={styles.section_container}>
      <div className={styles.right}>
        <span>손쉬운 참가</span>
        <p>
          팀을 생성하고 참가신청만 누르세요!!! 등록된 정보와 함께 팀장이 참가신청을 누르면 팀원들도 자동으로
          참가신청됩니다.
        </p>
      </div>
      <div className={styles.left}>
        <img src={description} alt={'설명이미지'} className={styles.poster} />
      </div>
    </div>
  )
}

export default HomeSectionThree
