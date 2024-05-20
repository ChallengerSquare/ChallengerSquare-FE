import useScrollTop from '@/hooks/useScrollTop'
import Navbar from '@components/Navbar/Navbar'
import title from '../../../public/images/home/home-title.webp'
import description from '../../../public/images/home/description.webp'
import styles from './HomeOri.module.scss'

const HomeOri = () => {
  useScrollTop()
  const mainContents = [
    {
      title: '손쉬운 행사 관리',
      description: '행사를 쉽게 관리해보세요!',
      imageURL: description,
    },
    {
      title: '손쉬운 참가',
      description: '행사에 참가하기 쉽게!',
      imageURL: description,
    },
    {
      title: '블록체인 기록 보장',
      description: '수상, 참가 기록은 블록체인으로 보장해드려요!',
      imageURL: description,
    },
  ]
  return (
    <>
      <div className={styles.home}>
        <div className={styles.main}>
          <Navbar enableScrollEffect />
          <div className={styles.title}>
            <img src={title} alt="title" />
          </div>
          <div className={styles.mainDescription}>
            <div>행사 개최, 관리, 참가를 한 곳에서.</div>
            <div>수상, 참가 기록은 블록체인으로 보장해드려요.</div>
          </div>
        </div>
        <div className={styles.contents}>
          {mainContents.map((mainContent, index) => {
            return index % 2 == 0 ? (
              <div className={styles.contentContainer}>
                <div className={styles.photo}>
                  <img src={mainContent.imageURL} alt="description" />
                </div>
                <div className={styles.content}>
                  <div className={styles.contentTitle}>{mainContent.title}</div>
                  <div className={styles.contentDescription}>{mainContent.description}</div>
                </div>
              </div>
            ) : (
              <div className={styles.contentContainer}>
                <div className={styles.content}>
                  <div className={styles.contentTitle}>{mainContent.title}</div>
                  <div className={styles.contentDescription}>{mainContent.description}</div>
                </div>
                <div className={styles.photo}>
                  <img src={mainContent.imageURL} alt="description" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomeOri
