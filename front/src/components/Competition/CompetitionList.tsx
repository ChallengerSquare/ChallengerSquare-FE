import { useState } from 'react'
import { Link } from 'react-router-dom'
import navigateBefore from '@/assets/navigate_before.svg'
import navigateNext from '@/assets/navigate_next.svg'
import styles from '@/components/Competition/CompetitionList.module.scss'
import backImg from '../../../public/images/competition/background.png'

interface Item {
  id: string
  image: string
  name: string
  date: string
}
interface Props {
  items: Item[]
  text: string
}

const CompetitoinList = ({ text, items }: Props) => {
  const itemPerPage = 4
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length] = useState(items.length)
  const [nextBtn, setNextBtn] = useState('next')

  // 슬라이드를 다음으로 이동
  const nextSlide = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + itemPerPage)
    }
  }

  // 슬라이드를 이전으로 이동
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - itemPerPage)
    }
  }

  const movetoCompetitionList = () => {}

  // 슬라이스된 아이템을 보여주는 렌더링 부분
  const slicedItems = items.slice(currentIndex, currentIndex + itemPerPage).map((item) => (
    <div className={styles.content_item} key={item.id}>
      <img src={backImg} alt="competImg" />
      <p>{item.date}</p>
      <span>{item.name}</span>
    </div>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>{text}</p>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.btn}>
          <button className={styles.left_btn} type="button" onClick={prevSlide} disabled={currentIndex <= 0}>
            {currentIndex >= length - itemPerPage ? <img src={navigateBefore} alt="이전" /> : null}
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.more}>
            <Link to="/competition/search"> 더보기 </Link>
            {/* <button type="button" onClick={movetoCompetitionList}>
              더보기
            </button> */}
          </div>
          <div className={styles.content_items}>{slicedItems}</div>
        </div>
        <div className={styles.btn}>
          <button
            className={styles.right_btn}
            type="button"
            onClick={nextSlide}
            disabled={currentIndex >= length - itemPerPage}
          >
            {currentIndex <= 0 ? <img src={navigateNext} alt="다음" /> : null}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompetitoinList
